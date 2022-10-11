import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  customer_id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({
    customer_id,
    name,
    email,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customer = await customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    customer.email = email;
    customer.name = name;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
