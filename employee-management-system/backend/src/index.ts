import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { getUser } from './middleware/auth';

dotenv.config();

const startServer = async () => {
    const app = express();
    app.use(cors());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            const user = getUser(token.replace('Bearer ', ''));
            return { user };
        }
    });

    await server.start();
    server.applyMiddleware({ app: app as any });

    const PORT = process.env.PORT;
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee-management';

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
};

startServer();
