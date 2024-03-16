# API (Calculo de Horas Empleados)

#

Practica que consiste en hacer una api  para manejar registro de horas pagadas a empleados utilizado metodos

- GET
- POST
- PUT
- DELETE

## Features

- (get) /employee -> obtener todos los empleados registrados
- (get) /employee/:id
-> obtener un empleado enviando el id
- (get) /employee/:id/hours
-> obtiene todas las horas trabajadas por un empleado, enviando el id
- (get) /employee/:id/salary
->  obtiene el salario a pagar basandose en el total de horas por el precio de hora del empleado
- (post) /employee
-> agrega un empleado nuevo
- (post) /employee/:id/hours
-> agrega un registro nuevo de horas usando el id del empleado para asociar las horas
- (put) /employee/:id
-> actualiza la informacion del empleado (solo el fullname y pricePerhours)
- (delete) / employee
-> borra un empleado y todo el registro de las horas trabajadas



## Tech

- node.js 
- Express
- TypeScript

## Installation

Si quieres utilizar la api debes de clonar el repositorio

instalar las dependecias correspondieinte e inicializar el servidor.

```sh
cd AA-PRACTICA4-BACKEND
npm i
node run start:dev
```
