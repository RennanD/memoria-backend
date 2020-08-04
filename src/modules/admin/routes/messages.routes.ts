import { Router } from 'express';
import controllUserAccess from '../../../middlewares/controllUserAccess';

import CreateMessageService from '../../user/services/CreateMessageService';

const messagesRouter = Router();

messagesRouter.use(controllUserAccess);

messagesRouter.post('/', async (request, response) => {
  const { message_type, message_content } = request.body;

  const createMessage = new CreateMessageService();

  const message = await createMessage.execute({
    message_type,
    message_content,
  });

  return response.json(message);
});

export default messagesRouter;
