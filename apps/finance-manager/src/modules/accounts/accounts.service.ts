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

  findAll(): AccountDto[] {
    return Array.from(this.accountMap.values()).flat();
  }

  findAllByUserId(userId: string): AccountDto[] {
    return this.accountMap[userId];
  }

  save(account: CreateAccountDto): AccountDto {
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
