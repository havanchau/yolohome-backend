import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from './message.schema';

// Subject class to manage message observers (connected clients)
class MessageSubject {
  private observers: Socket[] = [];

  // Add a new observer (connected client)
  addObserver(observer: Socket) {
    this.observers.push(observer);
  }

  // Remove an observer (disconnected client)
  removeObserver(observer: Socket) {
    this.observers = this.observers.filter((ob) => ob.id !== observer.id);
  }

  // Notify all observers (connected clients) about a new message
  notifyObservers(message: Message) {
    this.observers.forEach((observer) => observer.emit('newMessage', message));
  }
}

// Facade class to provide a simplified interface for message broadcasting
class MessageGatewayFacade {
  private subject: MessageSubject;

  constructor(private server: Server) {
    this.subject = new MessageSubject();
  }

  // Connect a client and add it as an observer
  connectClient(socket: Socket) {
    this.subject.addObserver(socket);

    // Handle message reception from the client
    socket.on('message', (message: Message) => {
      // Process and handle incoming message
      // ...

      // Broadcast the message to all connected clients
      this.subject.notifyObservers(message);
    });
  }

  // Disconnect a client and remove it as an observer
  disconnectClient(socket: Socket) {
    this.subject.removeObserver(socket);
  }
}

// Main WebSocket gateway class
@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private messageGatewayFacade: MessageGatewayFacade;

  constructor() {
    this.messageGatewayFacade = new MessageGatewayFacade(this.server);
  }

  handleConnection(socket: Socket) {
    this.messageGatewayFacade.connectClient(socket);
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.messageGatewayFacade.disconnectClient(socket);
    console.log(`Client disconnected: ${socket.id}`);
  }

  sendMessageToClient(message: Message) {
    this.server.emit('newMessage', message);
  }
}
