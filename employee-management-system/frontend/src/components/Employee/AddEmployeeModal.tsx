import { useState } from 'react';
import { X, Upload, User, Mail, Briefcase, Building2, GraduationCap, Calendar } from 'lucide-react';
import { useMutation, gql } from '@apollo/client';
import { useToast } from '../Toast/ToastProvider';

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      id
      name
      email
      age
      department
      position
      class
      subjects
      attendance
      photoUrl
    }
  }
`;

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        department: '',
        position: '',
        class: '',
        subjects: '',
        attendance: '100',
        photoUrl: ''
    });

    const [createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE, {
        onCompleted: () => {
            showToast('Employee added successfully!', 'success');
            onSuccess();
            handleClose();
        },
        onError: (error) => {
            showToast(error.message || 'Failed to add employee', 'error');
        }
    });

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            age: '',
            department: '',
            position: '',
            class: '',
            subjects: '',
            attendance: '100',
            photoUrl: ''
        });
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createEmployee({
                variables: {
                    input: {
                        name: formData.name,
                        email: formData.email,
                        age: parseInt(formData.age),
                        department: formData.department,
                        position: formData.position,
                        class: formData.class,
                        subjects: formData.subjects.split(',').map(s => s.trim()),
                        attendance: parseFloat(formData.attendance),
                        photoUrl: formData.photoUrl || `https://ui-avatars.com/api/?name=${formData.name}&background=random`
                    }
                }
            });
        } catch (err) {
            console.error('Error creating employee:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl glass-panel-light border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
                {/* Header */}
                <div className="sticky top-0 z-10 p-6 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent backdrop-blur-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Add New Employee</h2>
                                <p className="text-sm text-gray-400">Fill in the employee details below</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="btn-icon hover:rotate-90 transition-transform"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                <User className="w-4 h-4 text-primary" />
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                <Mail className="w-4 h-4 text-primary" />
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="john@company.com"
                                required
                            />
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                <Calendar className="w-4 h-4 text-primary" />
                                Age *
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="25"
                                min="18"
                                max="100"
                                required
                            />
                        </div>

                        {/* Department */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                <Building2 className="w-4 h-4 text-primary" />
                                Department *
                            </label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="HR">HR</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Operations">Operations</option>
                            </select>
                        </div>

                        {/* Position */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                <Briefcase className="w-4 h-4 text-primary" />
                                Position *
                            </label>
                            <select
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="">Select Position</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                                <option value="Lead">Lead</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                            </select>
                        </div>

                        {/* Class */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                Class *
                            </label>
                            <input
                                type="text"
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Class 10"
                                required
                            />
                        </div>

                        {/* Subjects */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                Subjects (comma-separated) *
                            </label>
                            <input
                                type="text"
                                name="subjects"
                                value={formData.subjects}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Math, Science, English"
                                required
                            />
                        </div>

                        {/* Photo URL */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                <Upload className="w-4 h-4 text-primary" />
                                Photo URL (optional)
                            </label>
                            <input
                                type="url"
                                name="photoUrl"
                                value={formData.photoUrl}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>

                        {/* Attendance */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                                Attendance: <span className="text-primary">{formData.attendance}%</span>
                            </label>
                            <input
                                type="range"
                                name="attendance"
                                value={formData.attendance}
                                onChange={handleChange}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                min="0"
                                max="100"
                                step="1"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="btn btn-secondary flex-1"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary flex-1"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner spinner-sm" />
                                    Adding...
                                </>
                            ) : (
                                'Add Employee'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
