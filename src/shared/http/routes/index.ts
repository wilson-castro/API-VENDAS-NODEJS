import { Router } from 'express';
import productRouter from '@modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

export default routes;
