import { Knex } from 'knex';

export class Chat {
  id!: string;
  message!: string;
  senderId!: string;
  receiverId!: string;
  isRead!: boolean;
  createdAt!: Date;
  deletedAt: Date | null = null;

  constructor(data: Partial<Chat>) {
    super();
    Object.assign(this, data);
  }

  static async create(knex: Knex, data: IChatCreate): Promise<Chat> {
    const [id] = await knex('chats').insert({
      message: data.message,
      sender_id: data.senderId,
      receiver_id: data.receiverId,
      is_read: false,
      created_at: new Date(),
    }).returning('id');

    return new Chat({ id, ...data, isRead: false, createdAt: new Date() });
  }

  static async findById(knex: Knex, id: string): Promise<Chat | null> {
    const chat = await knex('chats').where({ id }).first();
    return chat ? new Chat(chat) : null;
  }

  static async update(knex: Knex, id: string, data: Partial<IChatUpdate>): Promise<void> {
    await knex('chats').where({ id }).update(data);
  }

  static async softDelete(knex: Knex, id: string): Promise<void> {
    await knex('chats').where({ id }).update({ deleted_at: new Date() });
  }

  static async query(knex: Knex, query: IChatQuery): Promise<Chat[]> {
    const queryBuilder = knex('chats').whereNull('deleted_at');

    if (query.senderId) queryBuilder.where('sender_id', query.senderId);
    if (query.receiverId) queryBuilder.where('receiver_id', query.receiverId);
    if (query.isRead !== undefined) queryBuilder.where('is_read', query.isRead);
    if (query.createdAtStart) queryBuilder.where('created_at', '>=', query.createdAtStart);
    if (query.createdAtEnd) queryBuilder.where('created_at', '<=', query.createdAtEnd);

    const chats = await queryBuilder.select();
    return chats.map(chat => new Chat(chat));
  }

  markAsRead(): void {
    this.isRead = true;
  }

  isDeleted(): boolean {
    return !!this.deletedAt;
  }
}

export interface IChatCreate {
  message: string;
  senderId: string;
  receiverId: string;
}

export interface IChatUpdate {
  message?: string;
  isRead?: boolean;
}

export interface IChatQuery {
  senderId?: string;
  receiverId?: string;
  isRead?: boolean;
  createdAtStart?: Date;
  createdAtEnd?: Date;
}
