import { Injectable } from '@nestjs/common';
import { AccountDto, CreateAccountDto } from './dto/zod-dtos';
import { v4 as uuidv4 } from 'uuid';
type UserId = string;

@Injectable()
export class AccountsService {
  private accountMap: Map<UserId, AccountDto[]>;

  constructor() {
    this.accountMap = new Map();
  }

  async findAll(): Promise<AccountDto[]> {
    return Array.from(this.accountMap.values()).flat();
  }

  async findAllByUserId(userId: string): Promise<AccountDto[]> {
    return this.accountMap[userId];
  }

  async save(account: CreateAccountDto): Promise<AccountDto> {
    const newAccount = new AccountDto(
      uuidv4(),
      account.name,
      account.userId,
      new Date(),
      new Date(),
    );
    if (this.accountMap.has(account.userId)) {
      this.accountMap.get(account.userId)?.push(newAccount);
    } else {
      this.accountMap.set(account.userId, [newAccount]);
    }
    return newAccount;
  }
}
