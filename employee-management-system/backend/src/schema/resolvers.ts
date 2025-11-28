import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import User, { IUser } from '../models/User';
import Employee, { IEmployee } from '../models/Employee';
import { requireAuth, requireAdmin, AuthContext } from '../middleware/auth';

const generateToken = (user: IUser) => {
    return jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '7d' }
    );
};

export const resolvers = {
    Query: {
        me: async (_: any, __: any, context: AuthContext) => {
            requireAuth(context.user);
            return User.findById(context.user!.userId);
        },

        employee: async (_: any, { id }: { id: string }, context: AuthContext) => {
            requireAuth(context.user);
            return Employee.findById(id);
        },

        employees: async (_: any, { page = 1, limit = 10, filter, sort }: any, context: AuthContext) => {
            requireAuth(context.user);

            const query: any = {};

            if (filter) {
                if (filter.department) {
                    query.department = filter.department;
                }
                if (filter.position) {
                    query.position = filter.position;
                }
                if (filter.minAge !== undefined || filter.maxAge !== undefined) {
                    query.age = {};
                    if (filter.minAge !== undefined) query.age.$gte = filter.minAge;
                    if (filter.maxAge !== undefined) query.age.$lte = filter.maxAge;
                }
                if (filter.search) {
                    // Simple regex search for name or email
                    query.$or = [
                        { name: { $regex: filter.search, $options: 'i' } },
                        { email: { $regex: filter.search, $options: 'i' } }
                    ];
                }
            }

            const sortOptions: any = {};
            if (sort && sort.field) {
                sortOptions[sort.field] = sort.order === 'desc' ? -1 : 1;
            } else {
                sortOptions.createdAt = -1; // Default sort
            }

            const skip = (page - 1) * limit;

            const employees = await Employee.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalCount = await Employee.countDocuments(query);

            return {
                employees,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        }
    },

    Mutation: {
        signup: async (_: any, { email, password, role }: any) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new UserInputError('Email already in use');
            }

            const user = new User({ email, password, role: role || 'employee' });
            await user.save();

            const token = generateToken(user);
            return { token, user };
        },

        login: async (_: any, { email, password }: any) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new UserInputError('Invalid credentials');
            }

            const match = await user.comparePassword(password);
            if (!match) {
                throw new UserInputError('Invalid credentials');
            }

            const token = generateToken(user);
            return { token, user };
        },

        addEmployee: async (_: any, { input }: any, context: AuthContext) => {
            requireAdmin(context.user);

            const existingEmployee = await Employee.findOne({ email: input.email });
            if (existingEmployee) {
                throw new UserInputError('Employee with this email already exists');
            }

            const employee = new Employee(input);
            await employee.save();
            return employee;
        },

        updateEmployee: async (_: any, { id, input }: any, context: AuthContext) => {
            requireAdmin(context.user);

            const employee = await Employee.findByIdAndUpdate(
                id,
                { $set: input },
                { new: true, runValidators: true }
            );

            if (!employee) {
                throw new UserInputError('Employee not found');
            }

            return employee;
        },

        deleteEmployee: async (_: any, { id }: any, context: AuthContext) => {
            requireAdmin(context.user);

            const result = await Employee.findByIdAndDelete(id);
            if (!result) {
                throw new UserInputError('Employee not found');
            }

            return "Employee deleted successfully";
        },

        flagEmployee: async (_: any, { id }: any, context: AuthContext) => {
            requireAuth(context.user);
            // In a real app, this might toggle a flag field or add a flag record
            // For now, we'll just return the employee to simulate the action
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new UserInputError('Employee not found');
            }
            return employee;
        }
    }
};
