import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Plus, Users, AlertCircle } from 'lucide-react';
import HorizontalMenu from '../components/Navigation/HorizontalMenu';
import GridView from '../components/Employee/GridView';
import TileView from '../components/Employee/TileView';
import EmployeeDetail from '../components/Employee/EmployeeDetail';
import Filters from '../components/Employee/Filters';
import Pagination from '../components/Employee/Pagination';
import ViewToggle from '../components/Employee/ViewToggle';
import type { Employee, EmployeeFilter } from '../types';
import { useAuth } from '../context/AuthContext';
import StatsGrid from '../components/Dashboard/StatsGrid';

const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $limit: Int, $filter: EmployeeFilter, $sort: EmployeeSort) {
    employees(page: $page, limit: $limit, filter: $filter, sort: $sort) {
      employees {
        id
        name
        age
        class
        subjects
        attendance
        email
        position
        department
        photoUrl
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const FLAG_EMPLOYEE = gql`
  mutation FlagEmployee($id: ID!) {
    flagEmployee(id: $id) {
      id
    }
  }
`;

const Dashboard = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'tile'>('grid');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<EmployeeFilter>({});

    const { isAdmin } = useAuth();
    const itemsPerPage = 10;

    const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES, {
        variables: {
            page,
            limit: itemsPerPage,
            filter,
            sort: { field: 'createdAt', order: 'desc' }
        },
        fetchPolicy: 'network-only'
    });

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        onCompleted: () => refetch()
    });

    const [flagEmployee] = useMutation(FLAG_EMPLOYEE);

    const handleEdit = (employee: Employee) => {
        console.log('Edit employee', employee);
        alert(`Edit functionality for ${employee.name} would open here`);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee({ variables: { id } });
            } catch (err) {
                console.error('Error deleting employee', err);
            }
        }
    };

    const handleFlag = async (id: string) => {
        try {
            await flagEmployee({ variables: { id } });
            alert('Employee flagged successfully');
        } catch (err) {
            console.error('Error flagging employee', err);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-12">
            <HorizontalMenu />

            <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 animate-fade-in">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                            <span className="text-gradient-vibrant">Employee Directory</span>
                        </h1>
                        <p className="text-gray-400 flex items-center gap-2 text-sm sm:text-base">
                            <Users className="w-4 h-4" />
                            Manage and view all employee records
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />

                        {isAdmin && (
                            <button className="btn btn-primary flex items-center gap-2 group">
                                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                Add Employee
                            </button>
                        )}
                    </div>
                </div>

                {/* Statistics Grid */}
                {!loading && !error && data?.employees && (
                    <StatsGrid
                        totalEmployees={data.employees.totalCount || 0}
                        averageAttendance={
                            data.employees.employees.length > 0
                                ? Math.round(
                                    data.employees.employees.reduce((acc: number, emp: Employee) => acc + emp.attendance, 0) /
                                    data.employees.employees.length
                                )
                                : 0
                        }
                    />
                )}

                <div className="mb-8">
                    <Filters filter={filter} onFilterChange={(newFilter) => {
                        setFilter(newFilter);
                        setPage(1);
                    }} />
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-96 animate-fade-in">
                        <div className="spinner spinner-lg mb-4" />
                        <p className="text-gray-400 text-sm">Loading employees...</p>
                    </div>
                ) : error ? (
                    <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center animate-scale-in backdrop-blur-sm">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Employees</h3>
                        <p className="text-red-400/80 text-sm">{error.message}</p>
                        <button
                            onClick={() => refetch()}
                            className="btn btn-secondary mt-4"
                        >
                            Try Again
                        </button>
                    </div>
                ) : data?.employees.employees.length === 0 ? (
                    <div className="p-12 rounded-xl glass-panel-light border border-white/10 text-center animate-scale-in">
                        <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Employees Found</h3>
                        <p className="text-gray-400 mb-6">
                            {Object.keys(filter).length > 0
                                ? 'Try adjusting your filters to see more results'
                                : 'Get started by adding your first employee'}
                        </p>
                        {isAdmin && Object.keys(filter).length === 0 && (
                            <button className="btn btn-primary">
                                <Plus className="w-4 h-4" />
                                Add Employee
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        {viewMode === 'grid' ? (
                            <GridView
                                employees={data?.employees.employees || []}
                                onEmployeeClick={setSelectedEmployee}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onFlag={handleFlag}
                            />
                        ) : (
                            <TileView
                                employees={data?.employees.employees || []}
                                onEmployeeClick={setSelectedEmployee}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onFlag={handleFlag}
                            />
                        )}

                        <Pagination
                            currentPage={data?.employees.currentPage || 1}
                            totalPages={data?.employees.totalPages || 1}
                            totalCount={data?.employees.totalCount || 0}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </main>

            {selectedEmployee && (
                <EmployeeDetail
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onFlag={handleFlag}
                />
            )}
        </div>
    );
};

export default Dashboard;
