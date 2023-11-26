import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
        url: 'http://localhost:3000',
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
