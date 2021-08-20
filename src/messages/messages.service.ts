import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message-dto';
import { UpdateMessageDto } from './dto/update-message-dto';
import { Message } from './entites/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async getAll(): Promise<Message[]> {
    return await this.messagesRepository.find();
  }

  async getById(id: number): Promise<Message> {
    return await this.messagesRepository.findOne(id);
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = new Message();
    newMessage.message = createMessageDto.message;
    newMessage.username = createMessageDto.username;

    return await this.messagesRepository.save(newMessage);
  }

  async updateMessage(
    id: number,
    upateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const messageToUpdate = await this.messagesRepository.findOne(id);
    messageToUpdate.message = upateMessageDto.message;
    messageToUpdate.username = upateMessageDto.username;

    return await this.messagesRepository.save(messageToUpdate);
  }

  async deleteMessage(id: number): Promise<DeleteResult> {
    return await this.messagesRepository.delete(id);
  }
}
