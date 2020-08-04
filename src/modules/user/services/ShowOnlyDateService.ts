import { getRepository } from 'typeorm';

import ImportantDate from '../models/ImportantDate';

import AppError from '../../../errors/AppError';

interface Request {
  date_id: string;
}

interface Response {
  id: string;
  date: Date;
  description: string;
  create_at: Date;
  updated_at: Date;
  contact: {
    id: string;
    name: string;
    phone_number: string;
    avatar?: string;
  };
}

class ShowOnlyDateService {
  public async execute({ date_id }: Request): Promise<Response> {
    const dateRepository = getRepository(ImportantDate);

    const date = await dateRepository.findOne({
      where: {
        id: date_id,
      },
    });

    if (!date) {
      throw new AppError('Resgistro não encontrado.');
    }

    return {
      id: date.id,
      date: date.date,
      create_at: date.created_at,
      description: date.description,
      updated_at: date.updated_at,
      contact: {
        id: date.contact.id,
        name: date.contact.name,
        phone_number: date.contact.phone_number,
        avatar: date.contact.avatar
          ? `http://192.168.25.9:3333/files/${date.contact.avatar}`
          : '',
      },
    };
  }
}

export default ShowOnlyDateService;
