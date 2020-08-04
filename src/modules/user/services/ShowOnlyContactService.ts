import { getRepository } from 'typeorm';

import Contact from '../models/Contact';

import AppError from '../../../errors/AppError';

interface Request {
  contact_id: string;
}

interface Response {
  id: string;
  name: string;
  phone_number: string;
  avatar?: string;
  relationship: string;
}

class ShowOnlyContactService {
  public async execute({ contact_id }: Request): Promise<Response> {
    const contactRepository = getRepository(Contact);

    const contact = await contactRepository.findOne({
      where: {
        id: contact_id,
      },
    });

    if (!contact) {
      throw new AppError('Resgistro não encontrado.');
    }

    return {
      ...contact,
      avatar: contact.avatar
        ? `http://192.168.25.9:3333/files/${contact.avatar}`
        : '',
    };
  }
}

export default ShowOnlyContactService;
