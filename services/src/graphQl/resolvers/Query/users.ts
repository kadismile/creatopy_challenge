import { Users } from "../../../db/models/User"
import {compare} from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import accessEnv from "../../../helpers/accessEnv";

const JWT_SECRET = accessEnv("JWT_SECRET", "MySecretKey")

export const users = async<Promise>() => {
  return await Users.findAll();
}

export const user = async <Promise>(_: any ,args: any) => {
  return await Users.findOne({ where: { id: args.id } })
}

export const login = async <Promise>(_: any ,args: Users) => {
  const { password, email } = args

  const user = await Users.findOne({ where: { email } })

  if (!user) {
    return {
      message: "Invalid Email or Password"
    };
  }

  const verify = await compare(password, user.password);

  if (!verify) {
    return {
      message: "Wrong Password"
    };
  }

  return {
    accessToken: sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "60m"
    }),
    email: user.email,
    name: user.name
  };
}

export const fetchUser = async <Promise>(_: any ,args: any) => {
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
      return {
        accessToken,
        name: user.name,
        email: user.email,
        message: "Invalid Email or Password"
      };
    }
  } catch (e) {
    return {
      accessToken: null
    };
  }


}

