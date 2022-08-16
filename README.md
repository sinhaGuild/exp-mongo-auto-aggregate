#### EXPRESS - MONGO
---

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
