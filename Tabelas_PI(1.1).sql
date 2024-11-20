create database pi;
use pi;
create table alunos(
	id_aluno int primary key auto_increment not null,
    nome_aluno varchar(100) not null,
    email_aluno varchar(50) not null,
    senha_aluno int not null,
    nasc_aluno date not null,
    cpf_aluno int(11) not null,
    tel_aluno int(11) not null,
    gen_aluno enum('masculino','feminino','outro')
);

create table monitores(
	id_monitor int primary key auto_increment not null,
    nome_monitor varchar(100) not null,
    email_monitor varchar(50) not null,
    senha_monitor int not null,
    nasc_monitor date not null,
    cpf_monitor int(11) not null,
    tel_monitor int(11) not null,
    gen_monitor enum('masculino','feminino','outro')
);

create table aula(
	id_aula int primary key auto_increment not null,
    materia varchar(50),
    descricao varchar(100),
    horario datetime not null,
    carga_horaria int not null,
    id_monitor int,
    foreign key(id_monitor) references monitores(id_monitor)
);

create table agendamentos(
	id_agendamento int primary key auto_increment not null,
    id_aula int,
    id_aluno int,
    foreign key(id_aluno) references alunos(id_aluno),
    foreign key(id_aula) references aula(id_aula)
);