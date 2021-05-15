import {Books} from "../../../db/models/Books";
import {verify} from "jsonwebtoken";
import {Users} from "../../../db/models/User";
import accessEnv from "../../../helpers/accessEnv";

const JWT_SECRET = accessEnv("JWT_SECRET", "MySecretKey")
export const fetchBooks = async <Promise>(_: any ,args: any) => {
  const { accessToken } = args

  if (!accessToken) {
    return {
      message: "No Token Passed"
    };
  }
  try {
    const decoded: any = verify(accessToken, JWT_SECRET);
    let user:any = await Users.findOne({ where: { id: decoded.userId } })
    user = user.dataValues
    if (user) {
      return await Books.findAll({ where: { userId: user.id } })
    }
  } catch (e) {
    return e
  }
}