import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const accountBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  userId: z.string().uuid(),
});

const accountSchema = accountBaseSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class AccountDto extends createZodDto(accountSchema) {
  constructor(
    id: string,
    name: string,
    user_id: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.userId = user_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

const createAccountSchema = accountBaseSchema.omit({ id: true });
export class CreateAccountDto extends createZodDto(createAccountSchema) {}
