import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('[DB] ✅ Conectado ao banco de dados SQLite via Prisma');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // ✅ FEATURE 3: Salva mensagem no banco
  async saveMessage(data: { username: string; text: string }) {
    return this.message.create({
      data: {
        username: data.username,
        text: data.text,
      },
    });
  }

  // ✅ FEATURE 3: Busca histórico do banco (últimas 100 mensagens)
  async getHistory() {
    return this.message.findMany({
      orderBy: { createdAt: 'asc' },
      take: 100,
    });
  }
}