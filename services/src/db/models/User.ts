import {Column, DataType, Model, Table, HasMany} from 'sequelize-typescript'
import {Books} from "./Books";

@Table({
  defaultScope: {
    attributes: {exclude: ["deletedAt"]}
  },
  paranoid: true,
  tableName: "users"
})

export class Users extends Model<Users> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  id!: string

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name!: string

  @Column({
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      }
    },
    type: DataType.STRING
  })
  email!: string

  @Column({
    allowNull: false,
    validate: {
      min: 6,
    },
    type: DataType.STRING
  })
  password!: string

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  resetPasswordToken!: string

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  resetPasswordExpire!: string

  @HasMany(()=> Books)
  books!: Books[]

}


