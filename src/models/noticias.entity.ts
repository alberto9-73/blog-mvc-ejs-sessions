import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Comentario } from './comentarios.entity';
import { Usuarios } from './usuarios.entity';

@Entity()
export class Noticia {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	titulo: string;

	@Column({length:1000})
	contenido: string;

	@CreateDateColumn()
	create_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;

	@OneToMany(() => Comentario, (c) => c.noticia)
	comentarios: Comentario[];

	@ManyToOne(() => Usuarios, (u) => u.noticias, { nullable: true })
	usuario: Usuarios;
}
