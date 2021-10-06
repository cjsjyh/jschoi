import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', nullable: false })
  title: string

  @Column({ type: 'text', nullable: false })
  content: string

  @CreateDateColumn({ type: 'timestamptz', name: 'createdAt' })
  createdAt: string

  @Column({ type: 'integer', nullable: false, default: 0 })
  views: number

  @Column({ type: 'boolean', default: true })
  isExposed: boolean
}
