import {
  ChallengeResponseDTO,
  ChallengeWithQuestionsDTO,
} from "../../dto/challenge/challenge-response";
import { CUIDIdentityDTO } from "../../dto/shared/uid-identity";
import { IDIdentityDTO } from "../../dto/shared/id-identity";

export interface IChallengeService {
  getAllChallenges(): Promise<ChallengeResponseDTO[]>;
  getChallengeById(id: CUIDIdentityDTO): Promise<ChallengeWithQuestionsDTO>;
  completeChallenge(
    userID: IDIdentityDTO,
    challengeCUID: CUIDIdentityDTO,
  ): Promise<boolean>;
}
