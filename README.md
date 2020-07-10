
## Instalación

Instalar los paquetes de node:

```sh
npm install
```

Crear un archivo variables.env con el siguiente contenido:

```sh
PORT=YOUR_PORT
HOST=YOUR_IP
BD_STORAGE='yourdatabase.db'
```

iniciar el servidor con npm start , este comando creara el .db donde se almacenan los usuarios

```sh
npm start
```

## Endpoints

GET: Obtiene una lista de todos los usuarios
```sh
/api/v1/user
```
A este request se le pueden aplicar los siguientes filtros
```
/api/v1/user?Birthday[between]=2000-08-23,2021-09-23&Birthday[lte]=2010-07-23&Name[substring]=ca&LastName[substring]=sa
```

el query debe ser de la siguiente manera:
```
Propiedad[limites]=valor
```
por ejemplo:
```
Birthday[lte]=2010-07-23
```
Se filtran los usuarios con cumpleaños menor a la fecha 2010-07-23

Para el caso de fechas superiores se debe usar gte, para evaluar un rango de fechas usar between.
Para filtrar por nombre y apellido se usa el parametro a filtrar y el tipo de filtro.
Por ejemplo:

```
Name[substring]=ca&LastName[substring]=sa
```
Este filtro devuelve los usarios que contengan "ca" en el nombre y "sa" en el apellido

Todos los filtros son independientes y se puede usar uno junto con el otro.

GET: Obtiene un usuario segun su id
```sh
/api/v1/user/:id
```
POST: Agrega un usuario a la base de datos
```sh
/api/v1/user/add
```
Se debe enviar un json con el siguiente formato , se deben respetar las mayusculas y el nombre de las propiedades ya que en el modelo estan definidos de la misma forma.
```sh
{
	"Name":"julian",
	"LastName":"sanchez",
	"Birthday":"1991-07-23",
	"Dni":"36360805"
}

```
PUT: Modifica un usuario con el numero de id
```sh
/api/v1/user/:id
```
Se debe enviar un json con alguno de las siguientes propiedades
```sh
{
	"Name":"julian",
	"LastName":"sanchez",
	"Birthday":"1991-07-23",
	"Dni":"36360805"
}
```

DELETE: Elimina un usuario con el numero de id
```sh
/api/v1/user/:id
```

