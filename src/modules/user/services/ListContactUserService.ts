import { getRepository } from 'typeorm';

import Contact from '../models/Contact';

interface Request {
  user_id: string;
}

class ListContactUserService {
  public async execute({ user_id }: Request): Promise<Contact[]> {
    const contactRepository = getRepository(Contact);

    const contacts = await contactRepository.find({
      where: {
        user_id,
        deleted_at: null,
      },
    });

    const serializaredContacts = contacts.map(contact => ({
      ...contact,
      avatar: contact.avatar
        ? `${process.env.APP_URL}/${contact.avatar}`
        : `${process.env.APP_AVATAR}`,
    }));

    return serializaredContacts;
  }
}

export default ListContactUserService;
