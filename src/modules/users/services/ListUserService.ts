import { getCustomRepository, Repository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';

export class ListUserService extends Repository<User> {
  public async execute(): Promise<User[]> {
    const userRespository = getCustomRepository(UserRepository);

    const users = await userRespository.find();

    return users;
  }
}
