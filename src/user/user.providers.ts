import { User } from './user.entity ';
import { USER_REPO } from './user.constants';
export const userProviders = [
  {
    provide: USER_REPO,
    useValue: User,
  },
];
