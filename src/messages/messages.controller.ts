import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { UpdateMessageDto } from './dto/update-message-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
    this.messagesService
      .createMessage(createMessageDto)
      .then((message) => {
        response.status(HttpStatus.CREATED).json(message);
      })
      .catch(() =>
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error creating message.' }),
      );
  }

  @Get()
  getAll(@Res() response) {
    this.messagesService
      .getAll()
      .then((messages) => {
        response.status(HttpStatus.OK).json(messages);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error fetching messages.' });
      });
  }

  @Get(':id')
  getById(@Res() response, @Param('id') id: number) {
    this.messagesService
      .getById(id)
      .then((message) => {
        response.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error fetching message.' });
      });
  }

  @Put(':id')
  update(
    @Body() updateMessageDto: UpdateMessageDto,
    @Res() response,
    @Param('id') id: number,
  ) {
    this.messagesService
      .updateMessage(id, updateMessageDto)
      .then((message) => {
        return response.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error updating message.' });
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') id: number) {
    this.messagesService
      .deleteMessage(id)
      .then((res) => {
        response.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error deleting message.' });
      });
  }
}
