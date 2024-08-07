# Descripcion

## Correr en dev

1. Clonar el repo
2. Crear una copia del archivo .env y completar las variables de entorno
3. Instalar dependencias `npm i`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npx run seed`
7. Limpiar el localStorage del navegador
8. Correr el proyecto `npm run dev`

## Correr en prod
