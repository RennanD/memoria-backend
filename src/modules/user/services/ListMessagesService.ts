import { getRepository } from 'typeorm';

import Message from '../models/Message';

class ListMessagesSerive {
  public async execute(): Promise<Message[]> {
    const messageRepository = getRepository(Message);

    const messages = await messageRepository.find();

    return messages;
  }
}

export default ListMessagesSerive;
