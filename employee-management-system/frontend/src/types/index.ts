export interface User {
    id: string;
    email: string;
    role: 'admin' | 'employee';
}

export interface Employee {
    id: string;
    name: string;
    age: number;
    class: string;
    subjects: string[];
    attendance: number;
    email: string;
    position: string;
    department: string;
    photoUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginatedEmployees {
    employees: Employee[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export interface EmployeeFilter {
    department?: string;
    position?: string;
    search?: string;
    minAge?: number;
    maxAge?: number;
}

export interface EmployeeSort {
    field: string;
    order: 'asc' | 'desc';
}

export interface AuthPayload {
    token: string;
    user: User;
}
