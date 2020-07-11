
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
Usuarios con fechas de cumpleaños mayores al valor elegido
```
/api/v1/user?Birthday[gte]=1990-07-23
```
Usuarios con fechas de cumpleaños menores al valor elegido
```
/api/v1/user?Birthday[lte]=2000-07-23
```
Usuarios que tengan fecha de cumpleaños entre el rango elegido
```
/api/v1/user?Birthday[between]=1990-07-23,1995-09-12
```
Usuarios que contengan la cadena de caracteres que se pasa en "include" en el campo Name o LastName
```
/api/v1/user?&include=ne
```
Todos los filtros pueden usarse de forma independiente o combinarse.

el query debe ser de la siguiente manera:
```
Propiedad[limites]=valor
```
por ejemplo:
```
Birthday[lte]=2010-07-23
```
Se filtran los usuarios con cumpleaños menor a la fecha 2010-07-23,
los valores de las fechas se pueden pasar en formato YYYY-MM-DD o YYYY.

Para el caso de fechas superiores se debe usar gte, para evaluar un rango de fechas usar between.
Para filtrar por nombre y apellido se usa el query include y se pasa por valor una cadena de caracteres
Por ejemplo:

```
include=ju
```
Este filtro devuelve los usuarios que contengan "ju" en el nombre o en el apellido

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

