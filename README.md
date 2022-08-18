#### EXPRESS - MONGODB ATLAS

---

## How to use

---

### Install

```
#clone the repo
docker-compose up
docker ps
```

_Note_: Installation includes a seeding script which will run automatically as part of docker compose.

### Shutdown

```
docker-compose down

#Check volumes/images for regular cleanups
docker volumes prune
docker image prune
```

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
