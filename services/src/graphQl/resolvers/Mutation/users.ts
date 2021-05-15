import * as crypto from 'crypto'
import * as moment from 'moment'
var kue = require('kue')
import {Users} from "../../../db/models/User"
import {compare, hash} from "bcryptjs";
import {sendEmail} from '../../../helpers/'
import accessEnv from "../../../helpers/accessEnv";
import {sign} from "jsonwebtoken";



const JWT_SECRET = accessEnv("JWT_SECRET", "MySecretKey")

export const createUser = async <Promise>(_: any ,args: Users) => {
  const { password, email } = args
  const user =  await Users.findOne({ where: { email } })
  if (user) {
    return {
      message: "Email Already Taken"
    };
  } else {
    args.password = await hash(password, 13)
    let user: any = await Users.create(args)
    user = user.dataValues
    return {
      accessToken: sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "60m"
      }),
      email: user.email,
      name: user.name
    };
  }
}

export const recoverPassword = async <Promise>(_: any ,args: Users) => {
  const { email } = args
  const user =  await Users.findOne({ where: { email } })
  if (user) {
    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpire = await moment().add(1, 'hour').toISOString()

    await Users.update(
      { resetPasswordToken, resetPasswordExpire },
      { where: { id: user.id}
    })
    const DOMAIN_URL = accessEnv("DOMAIN_URL", "")
    const resetPasswordUrl = DOMAIN_URL+'reset-password-token/'+resetPasswordToken

    const queues = kue.createQueue();
    const type = "forgotEmailPasswordJob"
    queues
      .create(type, {
        email: user.email,
        subject: 'Password reset token',
        resetPasswordUrl
      })
      .priority("high")
      .save();
    await sendEmail(type);
    return {
      message: `Password Recovery Email Sent To ${email}`
    };

  } else {
    return {
      message: `No user found With That Email`
    };
  }
}

export const changePassword = async <Promise>(_: any ,args: any) => {
  let { oldPassword, newPassword, resetPasswordToken } = args
  const user =  await Users.findOne({ where: { resetPasswordToken } })
  if (user) {
    const verify = await compare(oldPassword, user.password);
    if (!verify) {
      return {
        message: "Wrong Current Password Provided"
      };
    } else {
      newPassword = await hash(newPassword, 13)
      await Users.update(
        { resetPasswordToken: "null", password: newPassword },
        { where: { id: user.id}
        })
      return {
        message: `Password Recovered Successfully`
      };
    }
  } else {
    return {
      message: `invalid or expired reset Password Token`
    };
  }
}





