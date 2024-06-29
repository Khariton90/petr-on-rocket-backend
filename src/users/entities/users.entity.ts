import { User } from '@shared-types/shared-types';

export class UsersEntity implements User {
  public _id?: string;
  public nickname: string;
  public points: number;
  public level: number;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.nickname = user.nickname.toLowerCase();
    this.points = user.points;
    this.level = user.level;
  }

  public toObject() {
    return { ...this };
  }
}
