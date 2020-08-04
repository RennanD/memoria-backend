import { getRepository } from 'typeorm';

import Message from '../models/Message';

interface Request {
  message_type: 'text' | 'file';
  message_content: string;
}

class CreateMessageService {
  public async execute({
    message_content,
    message_type,
  }: Request): Promise<Message> {
    const messageRepository = getRepository(Message);

    const message = messageRepository.create({
      message_type,
      message_content,
    });

    await messageRepository.save(message);

    return message;
  }
}

export default CreateMessageService;
