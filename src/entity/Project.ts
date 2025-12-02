import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    @Column("simple-array")
    tags: string[];

    @Column()
    link: string;

    @Column({ nullable: true })
    githubLink: string;
}
