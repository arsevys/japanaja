select * from usuarios;
drop table notifica;
drop table usuarios;
--select * from pg_class;
drop table tipoxnotificacion;
drop table notificaciones;
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
insert into cuentas (id_usu,num_cuenta,id_banco) values(32,'1234-1234-123',1);
insert into cuentas (id_usu,num_cuenta,id_banco) values(19,'1234-1234-123',1);

select * from cuentas;
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
    estado_opc varchar(50) default 'A',--i inactivo A activo
    codsum_opc varchar(15) ,
    estado_paso_opc char(1) default '2',
    acadmin_opc char(1) Default 'N',--son las acciones del administrador
    foreign key (id_usu) references usuarios(id_usu),
    foreign key (id_tipo) references tipos(id_tipo)
);

/* acadmin_opc es para decirle que en esa opcion  el usuario que lo publico
realizo correctamente la confirmacion 
N - No se realiso cconfirmacion
C - se realiso la confirmaciaon correctamente*/
select * from cuentas;

select * from opciones;
drop table propuestas
create table propuestas (
    id_propu serial primary key,
    id_usu int not null,
    id_cuenta int references cuentas not null,
    fecha_propu text default to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS'),
    estado_propu varchar(50) default 'A',
    
    estado_paso_propu char(1) default '2',
    id_opc int references opciones,
    acadmin_propu char(1) Default 'N',
    foreign key (id_usu) references usuarios(id_usu)   
);

select * from opciones;
alter table opciones add column acadmin_opc char(1) Default 'N';
alter table propuestas drop column mont_propu;

insert into propuestas(id_usu,id_cuenta,id_opc) 
values(31,2,22)

,(19,220.90,1,2); --1/2

select * from propuestas;
drop table transacciones;
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

select * from propuestas;



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


update opciones set
estadopaso_opc=2
where id_opc=9

select *
from opciones
--insertamos para el paso 3 recibos
create table paso3Recibos(
id_p3r serial,
id_usu int references usuarios(id_usu) not null,--usuario que fue eligido de las propuestas
id_opc int references opciones(id_opc) not null,
id_propu int references propuestas ,--propuesta eligida
numope_p3r text null,
fecha_p3r varchar(100) default to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS'),
estado_p3r char(1) default 'N', -- N no completado C Completado 
fechac_p3r varchar(100) null,  --es para cuando comfirme el deposito se guarda la fecha de este
primary key(id_usu,id_opc)
);

alter table paso3Recibos add column id_propu int references propuestas; 

select * from opciones;
select *  from paso3Recibos;

select * from propuestas;


create table paso3Propuesta(
id_p3p serial,
id_opc int references opciones(id_opc) not null,--usuario que fue eligido de las propuestas
id_propu int references propuestas(id_propu) not null,
foto_p3p text null,
fecha_p3p varchar(100) default to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS'),
estado_p3p char(1) default 'N', -- N no completado C Completado 
fechac_p3p varchar(100) null,  --es para cuando comfirme el deposito se guarda la fecha de este
primary key(id_opc,id_propu)
);

select * from paso3Propuesta;

delete from paso3Propuesta;
drop table paso3Propuesta;
insert into paso3Propuesta(id_usu,id_propu) values();


select * from paso3Propuesta;

drop table paso3Recibos;
select * from paso3Recibos;
delete from paso3Recibos;
-- actualisar cancelados propuestas
update opciones 
set estadopaso_opc='2' --R A C V
where id_opc=22
/*
R-realisado cuando seconcreto todo
A-sigue en pie a espera de un postulante
C - cuando el usuario que lo publico lo cancelo
V- cuando se vencio el tiempo limite
D-cuando el administrador confirma que el usuario

*/
--actualisar el paso 3 en completado
update paso3Recibos
set numope_p3r='' ,estado_p3r='C'
where id_p3r=$2

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

select * from transacciones;

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



--sacar datos de los prouestos

select u.id_usu,u.nom_usu ,u.ape_usu,u.foto_usu,estre_usu ,
(select count(*) from  transacciones t
inner join opciones o
on o.id_opc=t.id_opc
inner join propuestas p
on p.id_propu=t.id_propu
where p.id_usu=u.id_usu or o.id_usu=u.id_usu
) as Transacciones -- obtenemos las transacciones de los usuarios que estan propuestos en el recibo
from propuestas p
inner join opciones o
on p.id_opc=o.id_opc
inner join usuarios u 
on p.id_usu=u.id_usu
where p.id_opc=9

--paso 3 rellenar pagina
select p3.estado_p3r,p3.id_p3r,o.mont_opc,
to_char(interval '2 hour' - (now() at time zone 'UTC' -interval '5 hour'-p3.fecha_p3r::timestamp),'HH24:MI:SS') as hora,
case 
when '2 hour' -(now() at time zone 'UTC' -interval '5 hour' - p3.fecha_p3r::timestamp ) > - interval '-00:00:00' then 'NV'
else 'V' --vencio 
end as vencio
from paso3Recibos p3
inner join opciones o
on o.id_opc=p3.id_opc
where p3.id_opc=13 


--mostrar estado de un recibo
select *,
      to_char(interval '24 hour' -(now() at time zone 'UTC' -interval '5 hour' - opc.fecha_opc::timestamp),'HH24:MI:SS') as hora
      , case

      when '24 hour' -(now() at time zone 'UTC' - interval '5 hour' - opc.fecha_opc::timestamp) > -interval '-00:00:00' then 'NV'
      else 'V'
      end as Vencio from 
      opciones as opc 
      where opc.id_opc=1


-- mostrar estado de una propuw esta
select u.nom_usu,to_char('24 hour' - ( now() at time zone 'UTC' - interval '5 hour' - opc.fecha_opc::timestamp ),'HH24:MI:SS') as hora,opc.fecha_opc,
      to_char(opc.fecha_opc::timestamp  + '24 hour' ,'mm-dd') || ' del ' || to_char(opc.fecha_opc::timestamp + '24 hour','HH:MI AM') as fecha
      , case
      when '24 hour' -(now() at time zone 'UTC' - interval '5 hour' - opc.fecha_opc::timestamp) > -interval '-00:00:00' then 'NV'
      else 'V'
      end as Vencio, p.estado_paso_propu,p.estado_propu from 
      propuestas p
      inner join opciones as opc 
      on p.id_opc=opc.id_opc
      inner join usuarios as u
      on u.id_usu=opc.id_usu     
      where p.id_propu=2 and p.id_usu=31 


Tu propuesta ah sido aceptada por el usuario tal
del la publicacion de 
select *,'asdasd' ||'dasd' as op
 from opciones;
-- sacar datos del usuario para enviar a gmail del usuario
select u.correo_usu ,(select nom_usu from usuarios where id_usu=o.id_usu) as nombreO,
o.mont_opc,t.nom_tipo
from 
paso3Recibos as p3 
inner join usuarios u
on u.id_usu=p3.id_usu
inner join opciones o
on o.id_opc=p3.id_opc
inner join tipos t
on t.id_tipo=o.id_tipo
where p3.id_p3r=5


--sacar datos para enviar al gmail del administrador
/*
usted tiene una nueva revision de confirmacion de la publicacion del usuario tal
de su recibo  de 
*/

select o.id_opc ,o.mont_opc,u.nom_usu ,p3.numope_p3r as numope,
o.mont_opc-(o.mont_opc * 0.025) as monto,t.nom_tipo
from 
paso3Recibos as p3 
inner join opciones o
on o.id_opc=p3.id_opc
inner join tipos t
on t.id_tipo=o.id_tipo
inner join usuarios u
on u.id_usu=o.id_usu
where p3.id_p3r=22 and p3.estado_p3r='C'

--mostrar datos Propuesta paso 3
select * from propuestas ;


select * from opciones;

select u.nom_usu,t.nom_tipo,t.tipo_tipo,o.codsum_opc,
p.estado_propu,p.acadmin_propu,
o.mont_opc as monto,p3.*
from propuestas p
inner join opciones o
on o.id_opc=p.id_opc
inner join tipos t
on t.id_tipo=o.id_tipo
inner join usuarios u
on u.id_usu=o.id_usu
left join paso3Propuesta p3
on p.id_propu=p3.id_propu
where p.id_propu=3 and p.id_usu=31



--cargar datos de correo voucher
select p3p.id_propu, p3p.id_p3p,o.id_opc,u.nom_usu,o.mont_opc
,t.nom_tipo,t.tipo_tipo,p3p.foto_p3p,
(select us.nom_usu from usuarios us  
inner join propuestas pe on pe.id_usu=us.id_usu where pe.id_propu=p3p.id_propu) as nom
from paso3Propuesta p3p
inner join opciones o
on o.id_opc=p3p.id_opc
inner join tipos t
on t.id_tipo=o.id_tipo
inner join usuarios u
on u.id_usu=o.id_usu
where p3p.id_p3p=1 or p3p.estado_p3p='C'


select * from paso3Propuesta;


select * from propuestas;

select * from opciones;
create function confirmarCorreo()







update paso3Propuesta set
 estado_p3p='N'
   where id_p3p=1











