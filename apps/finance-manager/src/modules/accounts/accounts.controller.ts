import { UseGuards, Controller, Get, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountsService } from './accounts.service';
import { AccountDto, CreateAccountDto } from './dto/zod-dtos';

@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({ status: 200, description: 'Return all accounts' })
  getAccounts(): Promise<AccountDto[]> {
    return this.accountsService.findAll();
  }

  @Post('')
  @ApiOperation({ summary: 'Create new account' })
  @ApiResponse({ status: 200, description: 'Created account' })
  createAccount(@Body() accountDto: CreateAccountDto): Promise<AccountDto> {
    return this.accountsService.save(accountDto);
  }
}
