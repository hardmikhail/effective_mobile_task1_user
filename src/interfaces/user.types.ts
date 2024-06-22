import { User } from 'src/modules/user/entity/user.entity';

export interface Changes {
  event: string;
  at: Date;
  data: User;
}
