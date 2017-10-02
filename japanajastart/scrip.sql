

create table usuarios(
dni_usu char(9) primary key ,
nom_usu varchar(250) not null,
ape_usu varchar(250) not null,
comtra_usu varchar(100) not null,
cel_usu char(9) not null,
correo_usu varchar(25)
);
drop table usuarios;
alter table usuarios alter COLUMN correo_usu type varchar(100);
select * from usuarios
DELETE from usuarios 
where dni_usu='sad'

create table usuarios(
id_usu serial primary key ,
dni_usu char(9) ,
nom_usu varchar(250),
ape_usu varchar(250),
comtra_usu varchar(100),
cel_usu char(9) ,
correo_usu varchar(25) ,
id_face_usu varchar(50) unique,
foto_usu text ,
estrella_usu int default 0 
);

insert into usuarios (nom_usu,id_face_usu,foto_usu)
values ();

select *from usuarios where id_face_usu = '1394296637357195'

create table bancos(
id_ban serial primary key,
nom_ban varchar(100) not null
);

create table cuentas(
id_cuen serial primary key,
dni_cuen char(9) not null,
nun_cuen varchar(18) not null,
id_ban int not null
);


