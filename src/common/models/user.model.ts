import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRole } from "src/global/types/user.types";

@Table({tableName:"users"})
export class User extends Model{
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username:string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password:string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email:string

    @Column({
        type:DataType.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue:UserRole.User
    })
    role:UserRole

}
