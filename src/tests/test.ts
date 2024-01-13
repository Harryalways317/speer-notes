import { createUser } from '../models';
import { prismaMock } from './singleton';
import { v4 as uuidv4 } from 'uuid';
test('should create new user ', async () => {
  const id = uuidv4();
  const user = {
    id: id,
    email: `hello${id}@gmail.com`,
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(user.email, 'password')).resolves.toEqual(
    expect.objectContaining({
      email: user.email,
    })
  );
});
