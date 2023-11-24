import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { authController } from './controllers/auth';
import { prismaClient } from './database/connect';

const app = express();

const port = 3000;
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'ITroca Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'ITroca',
        url: 'https://itroca.com.br',
        email: 'itroca@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/controllers/**/*.ts'],
};

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

// Middleware for parsing application/json and application/x-www-form-urlencoded
app.use('/auth', express.json());
app.use('/auth', express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authController);

app.get('/', async (req, res) => {
  try {
    (await prismaClient()).user.create({
      data: {
        address: 'Primeiro endereço',
        age: 12,
        email: 'Email@gmail.com',
        name: 'George',
      },
    });
  } catch (e) {
    console.log('🚀 ~ file: app.ts:63 ~ app.get ~ e:', e);
  }

  const george = await (await prismaClient()).user.findMany();
  console.log('🚀 ~ file: app.ts:63 ~ app.get ~ george:', george);

  res.send(`Hello World ${JSON.stringify(george, null, 2)}`);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
