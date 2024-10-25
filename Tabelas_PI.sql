create database pi;
use pi;
create table alunos(
	id_aluno int primary key auto_increment not null,
    nome_aluno varchar(100) not null,
    email_aluno varchar(50) not null,
    senha_aluno int not null,
    nasc_aluno date not null
);

create table monitores(
	id_monitor int primary key auto_increment not null,
    nome_monitor varchar(100) not null,
    email_monitor varchar(50) not null,
    senha_aluno int not null,
    nasc_monitor date not null
);

create table cursos(
	id_curso int primary key auto_increment not null,
    materia varchar(50) not null,
    descricao varchar(450),
    carga_horaria int not null
);

create table monitorias(
	id_monitoria int primary key auto_increment not null,
    id_curso int,
    id_monitor int,
    foreign key(id_monitor) references monitores(id_monitor),
    foreign key(id_curso) references cursos(id_curso)
);

create table agendamentos(
	id_agendamento int primary key auto_increment not null,
    id_monitoria int,
    id_aluno int,
    horario datetime not null,
    foreign key(id_aluno) references alunos(id_aluno),
    foreign key(id_monitoria) references monitorias(id_monitoria)
);