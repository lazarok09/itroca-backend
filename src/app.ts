import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { ProductRouter, ProductsRouter } from './router/product';
import { UserRouter } from './router/user';
import { AuthRouter } from './router/auth';

const app = express();

const corsOptions = {
  origin: process.env.PUBLIC_WEB_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const port = 4000;
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Node 20 Express API with Swagger',
      version: '0.1.0',
      description: 'This API was made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Lazaro',
        url: 'https://github.com/lazarok09',
        email: 'lazarok09@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/controllers/**/*.ts', './src/controllers/**/*docs.yaml'],
};

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);
// Welcome route
app.get('/', async (_, res) => {
  res.send(
    'Welcome to the API, access <a href="http://localhost:3000/api-docs">documentação</a> to more details.',
  );
});

app.use('/', cors(corsOptions));
// Auth
app.use('/auth', AuthRouter());

// User

app.use('/user', UserRouter());

// Product
app.use('/products', ProductsRouter());
app.use('/product', ProductRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
