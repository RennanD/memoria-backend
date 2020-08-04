import { getRepository } from 'typeorm';

import Contact from '../models/Contact';

import AppError from '../../../errors/AppError';

interface Request {
  user_id: string;
  name: string;
  phone_number: string;
  avatar?: string;
  relationship: string;
}

class CreateContactService {
  public async execute({
    user_id,
    phone_number,
    ...rest
  }: Request): Promise<Contact> {
    const contactRespository = getRepository(Contact);

    const contactExists = await contactRespository.findOne({
      where: { phone_number },
    });

    if (contactExists) {
      throw new AppError('Este contato já foi adicionado');
    }

    const contact = contactRespository.create({
      user_id,
      phone_number,
      ...rest,
    });

    await contactRespository.save(contact);

    return contact;
  }
}

export default CreateContactService;
