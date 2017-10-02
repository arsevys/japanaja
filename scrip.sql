select * from usuarios;
drop table notifica;
drop table usuarios;
--select * from pg_class;


drop table transacciones;
drop table propuestas;
drop table opciones;
drop table cuentas;
drop table bancos;
drop table tipos;
drop table usuarios;

if exists(
SELECT * FROM pg_tables WHERE  schemaname = 'public' and tablename = 'usuarios' )
then
drop table usuarios;
end if;
create table usuarios(
    id_usu serial primary key,
    nom_usu varchar(100) not null,
    ape_usu varchar(300) null,
    cel_usu int ,
    correo_usu varchar(200) UNIQUE,
    id_face_usu varchar(20) UNIQUE ,
    dni_usu char(8) unique,
    contra_usu varchar(40) ,
    foto_usu text null,
    estre_usu int  default 0 ,
    check (estre_usu between 0 and 100)
);


create table bancos (
    id_banco serial primary key,
    nom_banco varchar(200) not null unique,
    tasa_banco decimal(10,3) not null
);

alter table bancos alter column tasa_banco type decimal(10,2);
insert into bancos(nom_banco,tasa_banco) values('BCP',10.14),('Interbank',1.50);

----AQUI SE CARGA LOS BANCOS QUE EXISTEN  en relacion alos usuarios
create table cuentas (
    id_cuenta serial primary key,
    id_usu int not null,
    num_cuenta varchar(50) not null,
    cocuin_cuenta  varchar(20) null, --codigo de cuenta interbancaria
    id_banco int not null,
    foreign key (id_banco) references bancos(id_banco),
    foreign key (id_usu) references usuarios(id_usu)
);

insert into cuentas (id_usu,num_cuenta,id_banco) values(19,'1234-1234-123',1);

--Aqui para rellenar los combobox delos diferentes servicios 
create table tipos (
    id_tipo serial primary key,
    tipo_tipo varchar(250) not null,-- ejemplo Servicio de agua ,Servicio de Luz
    nom_tipo varchar(100) not null -- ejemplo de nombre de cada servicio ejm : enel,luz del sur, sedapal
);
select * from tipos

create table opciones (
    id_opc serial primary key,
    id_usu int not null,
    mont_opc decimal(10,2) not null,
    num_cuent_opc varchar(50) not null,
    id_tipo int not null,
    fecha_opc text default to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS'),
    estado_opc varchar(50) default 'A',
    codsum_opc varchar(15) ,
    foreign key (id_usu) references usuarios(id_usu),
    foreign key (id_tipo) references tipos(id_tipo)
);

select * from propuestas;
select * from opciones;
create table propuestas (
    id_propu serial primary key,
    id_usu int not null,
    mont_propu decimal(7,2) not null,
   id_cuenta int references cuentas not null,
    fecha_propu text default to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS'),
    estado_propu varchar(50) default 'A',
    id_opc int references opciones,
    foreign key (id_usu) references usuarios(id_usu)
    
);

select * from opciones;
alter table propuestas drop column num_cuent_propu;
alter table propuestas add column id_cuenta int references cuentas;
insert into propuestas(id_usu,mont_propu,id_cuenta,id_opc) values(19,120.50,1,1),(19,220.90,1,2); --1/2

select *from propuestas;

create table transacciones (
    id_trans varchar(25) primary key, --autogenerado en el servidor Nodejs
    id_propu int not null,
    id_opc int not null,
    fecha_trans text default to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS'),
    cal_opc char(3)  default 'N' ,
    cal_propu  char(3)  default 'N', 
    foreign key (id_propu) references propuestas(id_propu),
    foreign key (id_opc) references opciones(id_opc)
);


insert into transacciones(id_trans,id_propu,id_opc) values('123','');

--aqui los diferentes tipos de notificaciones que se van a mostrar

create table tipoxnotificacion(
id_tn serial primary key,
cod_tn char(4) null,
descri_tn varchar(250)

);

insert into tipoxnotificacion(cod_tn,descri_tn) values
('PO','Publicar una Opcion o Recibo'), --1
('PP','Publicar una Propuesta hacia una opcion'), --2
('RP','Si an aceptado tu propuesta'),--3
('RO','Las Propuestas que an hecho a tu opcion o  recibo'), --4
('DO','Cuando el usuario de la opcion a hecho el deposito a japanaja');--5;
create table notificaciones (
    id_notifi serial primary key,
    id_trans varchar(25) references transacciones(id_trans) null,
    asunt_notif varchar(250) not null,
    des_notif text not null,
    estado_notif char(3) default 'N',
    fecha_notif text default to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS'),
    id_usu int references usuarios(id_usu) not null,
    id_tn int references tipoxnotificacion not null,
    check(estado_notif in ('N','V'))
);

insert into notificaciones()


insert into usuarios (nom_usu,id_face_usu,estre_usu)
values ('javier','12232434',100);

select * from usuarios;






alter table opciones alter column estado_opc set default 'A';
alter table opciones add column codsum_opc varchar(15);

insert into opciones (id_usu,mont_opc,num_cuent_opc,id_tipo)
values (1,300,'2343434',1);

select * from opciones;



alter table propuestas alter column estado_propu set default 'A';
alter table opciones add column id_opc int  references opciones;

select * from opciones;
insert into propuestas(id_usu,mont_propu,num_cuent_propu,id_opc,estado_propu) 
values(75,140.00,'1231231212',23,'A')


--5 75
--opciones  23/5
select * from opciones o
inner join usuarios u
on o.id_usu=u.id_usu
where u.id_usu=5

--propuestas
select *
from propuestas p


select *
from opciones


-- actualisar cancelados propuestas
update opciones 
set estado_opc='R' --R A C V
where id_opc=23 

select to_char(interval '24 hour' - (now() at time zone 'UTC' -interval '5 hour'-o.fecha_opc::timestamp),'HH24:MI:SS') as hora,
 u.id_usu,u.nom_usu,u.ape_usu,p.id_propu,o.fecha_opc,o.codsum_opc,t.descr_tipo,o.mont_opc,p.mont_propu
from propuestas p
inner join usuarios u
on p.id_usu=u.id_usu
inner join opciones o
on o.id_opc=p.id_opc
inner join tipos t
on t.id_tipo=o.id_tipo
where u.id_usu=5 and 
interval '24 hour' -(now() at time zone 'UTC' -interval '5 hour' - o.fecha_opc::timestamp ) > interval '-00:00:00'

create table transacciones (
    id_trans varchar(25) primary key,
    id_propu int not null,
    id_opc int not null,
    fecha_trans text default to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS'),
    cal_propu_trans char(3) default 'N',
    cal_opc_trans char(3) default 'N',
    foreign key (id_propu) references propuestas(id_propu),
    foreign key (id_opc) references opciones(id_opc)
);

drop table transacciones

insert into transacciones(id_trans,id_propu,id_opc) values('123',2,2);



insert into transacciones(id_propu,id_opc) values (3,23)
select * from usuarios;


--sacar opciones realisadas
select u.nom_usu,t.id_trans,t.fecha_trans,o.mont_opc,o.mont_opc/10::float ganancia , ti.nom_tipo,u.foto_usu,u.estre_usu,u.id_usu
from transacciones t
inner join opciones o
on o.id_opc=t.id_opc
inner join propuestas p
on p.id_propu=t.id_propu
inner join usuarios u
on u.id_usu=p.id_usu
inner join tipos ti
on ti.id_tipo=o.id_tipo
where o.id_usu=1

--sacar propuesta realisadasi
select u.nom_usu,u.foto_usu,u.estre_usu ,ti.nom_tipo,o.mont_opc,p.mont_propu,t.id_trans,t.fecha_trans,o.mont_opc - p.mont_propu ahorrado
from transacciones t

inner join propuestas p
on t.id_propu=p.id_propu
inner join opciones o
on o.id_opc=t.id_opc
inner join usuarios u
on u.id_usu=o.id_usu
inner join tipos ti
on ti.id_tipo=o.id_tipo
where p.id_usu=19



--script propuestas canceladas--
select u.nom_usu,u.ape_usu,u.foto_usu,u.estrella_usu ,ti.descr_tipo,o.mont_opc,p.mont_propu,to_char(t.fecha_trans::timestamp,'DD') dia,
initcap(to_char(t.fecha_trans::timestamp,'TMMONTH')) mes,
to_char(t.fecha_trans::timestamp,'HH12:MI:SS AM') hora
from transacciones t
inner join propuestas p
on t.id_propu=p.id_propu
inner join opciones o
on o.id_opc=t.id_opc
inner join usuarios u
on u.id_usu=o.id_usu
inner join tipos ti
on ti.id_tipo=o.id_tipo
where p.id_usu=75



       --sacar propuestas
       select to_char(interval '24 hour' - (now() at time zone 'UTC' -interval '5 hour'-o.fecha_opc::timestamp),'HH24:MI:SS') as hora,
         u.id_usu,u.nom_usu,u.ape_usu,b.nom_banco  ,p.id_propu,o.fecha_opc,o.codsum_opc,t.nom_tipo,o.mont_opc,p.mont_propu
        from propuestas p
        inner join usuarios u
        on p.id_usu=u.id_usu
        inner join opciones o
        on o.id_opc=p.id_opc
        inner join tipos t
        on t.id_tipo=o.id_tipo
        inner join cuentas c
        on c.id_cuenta=p.id_cuenta
        inner join bancos b
        on b.id_banco=c.id_banco
        where u.id_usu=19 and p.estado_propu='A' and
        interval '24 hour' -(now() at time zone 'UTC' -interval '5 hour' - o.fecha_opc::timestamp ) > interval '-00:00:00'





select fecha_opc
 from opciones

