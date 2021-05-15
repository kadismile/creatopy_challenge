import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript'
import {Users} from "./User";

@Table({
  defaultScope: {
    attributes: {exclude: ["deletedAt"]}
  },
  paranoid: true,
  tableName: "books"
})

export class Books extends Model<Books> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  id!: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER.UNSIGNED
  })
  @ForeignKey(()=> Users)
  userId!: string

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  title!: string

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  description!: string

  @BelongsTo(()=> Users)
  user!: Users
}
