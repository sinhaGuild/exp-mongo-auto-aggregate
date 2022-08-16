#### EXPRESS - MONGO
---

### Mongo pipelines with auto-aggregate
```
{
   7   │         $lookup: {
   8   │           from: "clans",
   9   │           localField: "clan.name",
  10   │           foreignField: "name",
  11   │           as: "clan",
  12   │         },
  13   │       },
  14   │       {
  15   │         $lookup: {
  16   │           from: "villages",
  17   │           localField: "village.name",
  18   │           foreignField: "name",
  19   │           as: "village",
  20   │         },
  21   │       },
  22   │       {
  23   │         $lookup: {
  24   │           from: "jutsus",
  25   │           localField: "jutsu.name",
  26   │           foreignField: "name",
  27   │           as: "jutsu",
  28   │         },
  29   │       },
  30   │       {
  31   │         $merge: {
  32   │           into: "shinobis",
  33   │           // on: "_id",
  34   │           whenMatched: "merge",
  35   │           whenNotMatched: "insert",
  36   │         },
  37   │       },
```
