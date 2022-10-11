import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomerControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomer = new ListCustomerService();

    const customers = await listCustomer.execute();

    return response.json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCustomer = new CreateCustomerService();
    const { name, email } = request.body;

    const customer = await createCustomer.execute({ name, email });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCustomer = new UpdateCustomerService();

    const customer_id = request.params.id;
    const { name, email } = request.body;

    const customer = await updateCustomer.execute({ customer_id, name, email });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCustomer = new DeleteCustomerService();
    const customer_id = request.params.id;

    await deleteCustomer.execute({ customer_id });

    return response.json([]);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showCustomer = new ShowCustomerService();
    const customer_id = request.params.id;

    const customer = await showCustomer.execute({ customer_id });

    return response.json(customer);
  }
}
