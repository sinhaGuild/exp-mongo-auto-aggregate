#### EXPRESS - MONGODB ATLAS

---

## How to use

---

### Install

```
#clone the repo

docker-compose up	//Sets up a local instance of MongoDB
cd server
npm install
```

Create .env file at `server/`

```
PORT=4000
MONGO_URI=mongodb://mongouser:mongo@localhost:27017/mydb?authSource=admin
```

_Note_: Installation includes a seeding script which will run automatically as part of docker compose.

### Shutdown

```
docker-compose down

#Check volumes/images for regular cleanups
docker volumes prune
docker image prune
```

<details>
<summary>Expand for a fully containerized install</summary>
</br>
Uncomment the following code from

`docker-compose.yml`

```
server:
build: ./server
container_name: express-server
ports:
- "4000:4000"
volumes:
- ./server:/app:ro
- /server/node_modules
depends_on:
- mongo
```

Change the `database-host` reference in .env file to the container-name for server

```
MONGO_URI=mongodb://mongouser:mongo@mongo:27017/mydb?authSource=admin
```

Run the container

```
docker-compose up --build -v
```

</details>

### Mongo Aggregation Example

When a new user (e.g. _shinobi_) is added with _keys_ which are existing in the database, mongodb will call an auto-aggregate function using pipelines which trigger on `changeStream()` listeners.

Example

1. Trigger `seedShinobi.js` seed function.

```
node db/seed/seedShinobi.js
```

**Sample input**

```

{
	shinobi_name: "Naruto",
	designation: "Chunin",
	clan: [
		{
			name: "Uzumaki"
		},
	],

	village: [
		{name: "Konoha"},
	],
	jutsu: [
		{name: "Kagebunshin no jutsu"},
		{name: "Rasengan"},
		{name: "Eroke no jutsu"},
	],
}
```

**After Aggregation**
(Aggregation pipeline is triggered as an `async waterfall` function. Use the returned id from seeding function to retrieve the records)

```

{
shinobi_name: "Naruto",
designation: "Chunin",
clan: [
		{
			name: "Uzumaki",
			population: 2,
		},
	],
village: [
		{
			name: "Konoha",
			country: "Fire",
		},
	],
jutsu: [
		{
			name: "Kagebunshin no jutsu",
			description: "Multliplies self based on chakra",
			rank: 100,
		},
		{
			name: "Rasengan",
			description: "Concentrated ball of chakra.",
			rank: 5,
		},
		{
			name: "Eroke no jutsu",
			description: "Transform into a sexy partner.",
			rank: 999,
		},
	],
}
```

### Mongo pipelines with auto-aggregate

```
{
        $lookup: {
          from: "clans",
          localField: "clan.name",
          foreignField: "name",
          as: "clan",
        },
      },
      {
        $lookup: {
          from: "villages",
          localField: "village.name",
          foreignField: "name",
          as: "village",
        },
      },
      {
        $lookup: {
          from: "jutsus",
          localField: "jutsu.name",
          foreignField: "name",
          as: "jutsu",
        },
      },
      {
        $merge: {
          into: "shinobis",
          // on: "_id",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
```
