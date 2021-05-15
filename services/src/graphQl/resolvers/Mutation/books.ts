import {Books} from "../../../db/models/Books"
import {Users} from "../../../db/models/User"
import {verify} from "jsonwebtoken";
import accessEnv from "../../../helpers/accessEnv";

const JWT_SECRET = accessEnv("JWT_SECRET", "MySecretKey")

export const createBook = async <Promise>(_: any ,args: any) => {
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
      delete args.accessToken
      args.userId = user.id
      let book: any = await Books.create(args)
      book = book.dataValues
      return {
        title: book.title,
        description: book.description,
      };
    }
  } catch (e) {
    return e
  }
}