# Welcome to my first Swagger e-commerce API

<h2 id="tecnologias">
 Tec's ⤵️
</h2>

| Back-End                                       | Description                                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Node](https://nodejs.org/docs/latest/api/)    | Simple and efficient, how to now fall in love with Node 20?                              |
| [Express](https://expressjs.com/)              | Fast and furious, one of the oldest and fastest                                          |
| [Docker](https://www.docker.com/)              | Container application solution                                                           |
| [Prisma](https://www.prisma.io/)               | Database ORM, for me the best in the market for typescript                               |
| [Postgress](https://www.postgresql.org/)       | What can i say? It is opensource :D                                                      |
| [Cloudnary](https://cloudinary.com/)           | A service that provide to us the CDN application to save our images                      |

<hr>

## Demonstration

Docs available at [api-docs](http://localhost:4000/api-docs/) after you do the <a href=#run>Running the project steps </a>

<div align=center>
    
<img src=https://github.com/user-attachments/assets/94d47ff7-1ba3-40bd-a6e3-69b2c9e3c6a1 />

</div>

<h2 id="run">
    Running the project
</h2>

First of all, we are using docker here to build the dev enviroment fast and with simple configuration.

1. Up the docker enviroment with docker compose
`docker compose up -d`
2. Access the docs at [api-docs](http://localhost:4000/api-docs/)

#### Scripts

1. Install the projects dependecies

```bash
    yarn
```
2. Run dev mode

```bash
    yarn dev
```

<br>

<hr>

### Accessing the database inside docker
```
docker exec -it docker_hash_id bash

psql -U admin -d itrocadata


// change to the database you want
 \c itrocadata

 // list all tables
 \dt

 // preceed to execute sql instructions
 SELECT * FROM "User";
```

#### Where the postgress database is located at your docker volumes
```
cd /
 cd ./var/lib
 ls -lha docker/volumes
```

<span align=center>

# < 👨‍💻 />
    
</span>
