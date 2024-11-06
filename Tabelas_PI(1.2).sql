create database pi;
use pi;
create table alunos(
	id_aluno int primary key auto_increment not null,
    nome_aluno varchar(100) not null,
    email_aluno varchar(50) not null,
    senha_aluno varchar(20) not null,
    nasc_aluno date not null,
    cpf_aluno varchar(11) not null,
    tel_aluno varchar(11) not null,
    gen_aluno enum('m','f','nd')
);

create table monitores(
	id_monitor int primary key auto_increment not null,
    nome_monitor varchar(100) not null,
    email_monitor varchar(50) not null,
    senha_monitor varchar(20) not null,
    nasc_monitor date not null,
    cpf_monitor varchar(11) not null,
    tel_monitor varchar(11) not null,
    gen_monitor enum('masculino','feminino','outro')
);

create table materias(
	id_materia int primary key auto_increment not null,
    nome_materia varchar(50) not null,
    descricao varchar(450)
);

create table mat_monitor(   /*Tabela para relacionar monitores com matérias(n,n)*/
	id_mat_monitor int primary key auto_increment not null,
    id_monitor int,
    id_materia int,
    foreign key(id_monitor) references monitores(id_monitor),
    foreign key(id_materia) references materias(id_materia)
);

create table aulas(
	id_aula int primary key auto_increment not null,
    horario datetime not null,
    link varchar(250),
    id_materia int,
    id_monitor int,
    foreign key(id_monitor) references monitores(id_monitor),
    foreign key(id_materia) references materias(id_materia)
);

create table aula_aluno(
	id_aula_aluno int primary key auto_increment not null,
    id_aula int,
    id_aluno int,
    foreign key(id_aluno) references alunos(id_aluno),
    foreign key(id_aula) references aulas(id_aula)
);