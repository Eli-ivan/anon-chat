import { Model } from 'objection';
import knex from '../utils/db';

Model.knex(knex);

export class User extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;

  static tableName = 'users';

  static jsonSchema = {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
    },
  };
}
