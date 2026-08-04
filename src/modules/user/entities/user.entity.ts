import { entityName } from "src/common/enums/entityName.enum";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity(entityName.User)
export class User {
    @PrimaryColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column({select : false})
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
