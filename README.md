<div align="center">
  <a href="https://github.com/josemelendez1/banca-transfer.git">
    <img src="frontend/public/logo-transparent.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Banca Transfer</h3>
</div>


<!-- ABOUT THE PROJECT -->
## Acerca del proyecto

¡Bienvenido a la aplicación de transferencia bancaria! Los usuarios pueden transferir 
dinero entre cuentas bancarias con esta aplicación de manera rápida y segura. 
Nuestra aplicación está diseñada con un enfoque en la simplicidad y la seguridad, lo que facilita la gestión de tus transacciones financieras. 
`josemelendez1`, `v1.0`


### Construido con

* [![Npm][Npm]][Npm-url]
* [![React][React]][React-url]
* [![Spring-Boot][Spring-Boot]][Spring-Boot-url]
* [![Spring-Security][Spring-Security]][Spring-Security-url]
* [![TailwindCss][TailwindCss]][TailwindCss-url]
<!-- GETTING STARTED -->
## Empezando

Para poner en funcionamiento el proyecto, sigue estos sencillos pasos.

### Prerrequisitos

* npm
  ```sh
  npm install -g npm
  ```
* mysql
  http://dev.mysql.com/downloads/mysql/

* Java
  https://www.java.com/es/

* Java JDK
  https://www.oracle.com/java/technologies/downloads/

### Instalación
1. Clonar el repositorio
   ```sh
   https://github.com/josemelendez1/banca-transfer.git
   ```
2. Instalar paquetes NPM
   ```sh
   npm install
   cd /frontend npm install
   ```
3. Acceder al archivo /banco-transfer-spring-boot/src/main/resources/application.properties y configurar las siguientes propiedades. 
    ```js
    spring.datasource.url = jdbc:mysql://localhost:3306/[Nombre Base de Datos]
    spring.datasource.username=[Usuario Mysql]
    spring.datasource.password=[Contraseña Mysql]
   ```
4. Crear la base de datos en MySql con el nombre asignado en <b>spring.datasource.url</b>.
5. Desplegar BackEnd
   ```sh
   mvn spring-boot:run
   ```

6. Desplegar Frontend
   ```sh
   cd /frontend
   npm run start
   ```

7. Crear usuarios de ejemplo (Opcional): Visitar la ruta http://localhost:8090/user/faker con el metodo POST para generar usuarios aleatorios.
   Puede utilizar una herramienta para probar APIS.
<!-- LICENSE -->
## Licencia

Distribuido bajo la licencia MIT. Consulte `LICENSE.txt` para obtener más información.


<!-- CONTACT -->
## Contacto

Enlace del proyecto: https://github.com/josemelendez1/banca-transfer.git

[Npm]: https://img.shields.io/npm/v/npm.svg?logo=nodedotjs
[Npm-url]: https://www.npmjs.com/
[React]: https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge
[React-url]: https://react.dev/
[Spring-Boot]: https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=Spring&logoColor=white
[Spring-Boot-url]: https://spring.io/projects/spring-boot
[Spring-Security]: https://img.shields.io/badge/Spring%20Security-6.1.0-green?logo=springsecurity
[Spring-Security-url]: https://spring.io/projects/spring-security
[TailwindCss]: https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss
[TailwindCss-url]: https://tailwindcss.com/

