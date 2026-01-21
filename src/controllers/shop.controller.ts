import { Request, Response } from "express";
import { ApiResponse } from "../dto/shared/api-response";
import { IDIdentitySchema } from "../dto/shared/id-identity";
import { UserService } from "../services/user.service";

export class ShopController {
  constructor(private readonly userService: UserService) {}

  buyHeart = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.session?.user?.id;
    if (!userId) {
      throw new Error("User not found");
    }

    const result = await this.userService.buyHeart(userId);

    if (!result.success) {
      res.status(400).json({
        success: false,
        error: {
          code: "SHOP_ERROR",
          message: result.message,
        },
      } satisfies ApiResponse<null>);
      return;
    }

    res.status(200).json({
      success: true,
      message: result.message,
      data: null,
    } satisfies ApiResponse<null>);
  };
}
