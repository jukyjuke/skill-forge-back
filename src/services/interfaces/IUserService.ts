import { GainXPDTO } from "../../dto/user/gain-xp";
import { UpdatePasswordDTO } from "../../dto/user/update-password";
import { UpdateEmailDTO } from "../../dto/user/update-email";

export interface IUserService {
  gainXP(data: GainXPDTO): Promise<void>;
  updatePassword(data: UpdatePasswordDTO): Promise<void>;
  updateEmail(data: UpdateEmailDTO): Promise<void>;
  deleteAccount(userId: string): Promise<void>;
  getActivity(userId: string): Promise<number[]>;
  getPublicProfile(userId: string): Promise<any>;
  loseHeart(userId: string): Promise<void>;
  checkAndRegenerateHearts(userId: string): Promise<any>;
}
