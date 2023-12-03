import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import AuthController from './controllers/auth';
import ProductController from './controllers/product';
import UserController from './controllers/user';
import { authMiddleware } from './middlewares/auth';

const app = express();

const port = 4000;
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
// Auth
app.use('/auth', express.json());
app.use('/auth', express.urlencoded({ extended: true }));
app.post('/auth/signin', AuthController.signIn);
app.post('/auth/signout', AuthController.signOff);

app.use('/auth/signup', express.json());
app.use('/auth/signup', express.urlencoded({ extended: true }));
app.post('/auth/signup', AuthController.signUp);

// User
app.get('/user/:id', authMiddleware, UserController.getUser);

app.use('/users', express.json());
app.use('/users', express.urlencoded({ extended: true }));
app.get('/users', UserController.getUsers);

// Product
app.get('/product/:id', ProductController.getProduct);
app.use('/product', authMiddleware, express.json());
app.use('/product', authMiddleware, express.urlencoded({ extended: true }));
app.post('/product', authMiddleware, ProductController.createProduct);

// Products
app.get('/products', ProductController.getProducts);
app.delete('/products', ProductController.deleteProducts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
