
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
GET: Obtiene un usuario segun su id
```sh
/api/v1/user/:id
```
POST: Agrega un usuario a la base de datos
```sh
/api/v1/user/add
```
Se debe enviar un json con el siguiente formato
```sh
{
	"name":"julian",
	"lastname":"sanchez",
	"birthday":"1991-07-23",
	"dni":"36360805"
}

```
PUT: Modifica un usuario con el numero de id
```sh
/api/v1/user/:id
```
Se debe enviar un json con alguno de las siguientes propiedades
```sh
{
	"name":"julian",
	"lastname":"sanchez",
	"birthday":"1991-07-23",
	"dni":"36360805"
}
```

DELETE: Elimina un usuario con el numero de id
```sh
/api/v1/user/:id
```

GET: devuelve todos los usuarios dependiendo de la cantidad de filtros que se le apliquen al endpoint
```sh
/api/v1/filter?date[gte]=1998-07-25&date[lte]=1999-07-25&include=uli
```
los queries se deben usar de la siguente manera

filtro segun la fecha de cumpleaños
```sh
date[gte]=1991-07-23 limite inferior de fecha
date[lte]=1992-07-23 limite inferior de fecha
```


filtro de nombre o apellido
```sh
include=julian 
```
filtra los usuarios que incluyen el string de include ya sea en el nombre o el apellido
