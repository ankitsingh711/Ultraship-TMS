import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Employee from '../models/Employee';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee-management';

const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];
const positions = ['Junior', 'Senior', 'Lead', 'Manager', 'Director'];
const subjects = ['Math', 'Science', 'History', 'English', 'Art', 'Physics', 'Chemistry'];

const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Employee.deleteMany({});
        console.log('Cleared existing data');

        // Create Users
        const admin = new User({
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });
        await admin.save();

        const employeeUser = new User({
            email: 'employee@example.com',
            password: 'password123',
            role: 'employee'
        });
        await employeeUser.save();

        console.log('Created users: admin@example.com, employee@example.com (password: password123)');

        // Create Employees
        const employees = [];
        for (let i = 1; i <= 50; i++) {
            const numSubjects = getRandomInt(2, 5);
            const employeeSubjects = [];
            for (let j = 0; j < numSubjects; j++) {
                employeeSubjects.push(getRandomElement(subjects));
            }

            employees.push({
                name: `Employee ${i}`,
                age: getRandomInt(22, 60),
                class: `Class ${getRandomInt(1, 12)}`,
                subjects: [...new Set(employeeSubjects)], // Unique subjects
                attendance: getRandomInt(60, 100),
                email: `employee${i}@company.com`,
                position: getRandomElement(positions),
                department: getRandomElement(departments),
                photoUrl: `https://i.pravatar.cc/150?u=${i}`
            });
        }

        await Employee.insertMany(employees);
        console.log(`Seeded ${employees.length} employees`);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
