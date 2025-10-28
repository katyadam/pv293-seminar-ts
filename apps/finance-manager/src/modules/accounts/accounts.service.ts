import { Injectable } from '@nestjs/common';
import { AccountDto, CreateAccountDto } from './dto/zod-dtos';
type UserId = string;

@Injectable()
export class AccountsService {
  private accountMap: Map<UserId, AccountDto[]>;
  private idGen: number;
  constructor() {
    this.accountMap = new Map();
    this.idGen = 0;
  }

  findAll(): AccountDto[] {
    return Array.from(this.accountMap.values()).flat();
  }

  findAllByUserId(userId: string): AccountDto[] {
    return this.accountMap[userId];
  }

  save(account: CreateAccountDto): AccountDto {
    const newAccount = new AccountDto(
      this.idGen.toString(),
      account.name,
      account.userId,
      new Date(),
      new Date(),
    );
    this.idGen += 1;
    if (this.accountMap.has(account.userId)) {
      this.accountMap.get(account.userId)?.push(newAccount);
    } else {
      this.accountMap.set(account.userId, [newAccount]);
    }
    return newAccount;
  }
}
