import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly chatService: ChatService) {}

  // ✅ FEATURE 1: Indicador de Presença
  async handleConnection(client: Socket) {
    const username = client.handshake.query.username as string;
    client.data.username = username || `Usuário_${client.id.slice(0, 4)}`;

    // Exibe no console quando novo usuário conecta
    console.log(`[CONEXÃO] ✅ "${client.data.username}" entrou no chat. (ID: ${client.id})`);

    // Notifica todos os clientes sobre a entrada
    this.server.emit('user_joined', {
      username: client.data.username,
      message: `${client.data.username} entrou no chat`,
      timestamp: new Date().toISOString(),
    });

    // ✅ FEATURE 3: Persistência — envia histórico ao cliente que conectou
    const history = await this.chatService.getHistory();
    client.emit('chat_history', history);
  }

  handleDisconnect(client: Socket) {
    const username = client.data.username || client.id;

    // Exibe no console quando usuário sai
    console.log(`[DESCONEXÃO] ❌ "${username}" saiu do chat. (ID: ${client.id})`);

    // Notifica todos os clientes sobre a saída
    this.server.emit('user_left', {
      username,
      message: `${username} saiu do chat`,
      timestamp: new Date().toISOString(),
    });
  }

  // ✅ FEATURE 3: Persistência — salva mensagem no banco antes de broadcast
  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { text: string },
  ) {
    const username = client.data.username;

    // Salva no banco de dados
    const savedMessage = await this.chatService.saveMessage({
      username,
      text: data.text,
    });

    // Transmite para todos os clientes conectados
    this.server.emit('receive_message', {
      id: savedMessage.id,
      username: savedMessage.username,
      text: savedMessage.text,
      timestamp: savedMessage.createdAt.toISOString(),
    });
  }
}