import { Router } from 'express';
import productRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', usersRouter);
routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

export default routes;
