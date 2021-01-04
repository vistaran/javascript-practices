## Find records with age less than 25
```
db.users.aggregate([
    {
        $match: {
            age: {$lt: 25}
        }
    }
])
```

## Find number of males and females with age less than 30 and sort by count
```
db.users.aggregate([
    {
        $match: {
            age: {$lt: 30}
        }
    },
    {
        $group: {
            _id: "$gender",
            count: {$sum: 1}
        }
    },{
        $sort: {
            count: -1
        }
    }
])
```

## Pagination using aggregation

Pagination formula understanding
```
1 -> (1 - 1) * 10 -> 0
2 -> (2 - 1) * 10 -> 10
3 -> (3 - 1) * 10 -> 20
4 -> (4 - 1) * 10 -> 30
```
Pagination formula example
```
var limit = 10;
var page = 1;
var offset = (page - 1) * offset;
```

MySQL Pagination example
```
SELECT * FROM users LIMIT 10 OFFSET 0
SELECT * FROM users LIMIT 10 OFFSET 10
SELECT * FROM users LIMIT 10 OFFSET 20
```

MongoDB Pagination example `$skip` and `$limit`
```
db.users.aggregate([
    {
        $skip: 10 // page = 2
    },
    {
        $limit: 10
    }
])
```

## $first and $last example

```
db.users.aggregate([
    {
        $group: {
            _id: '$gender',
            count: {$sum: 1},
            record: {
                $last: '$name'
            }
        }
    }
])
```

## Project

```
db.users.aggregate([
    {
        $group: {
            _id: '$age',
            count: {$avg: 1},
            record: {
                $last: '$name'
            }
        }
    },
    {
        $project: {
            _id: 0,
            gender: "$_id",
            count: 1,
            name: "$record"
        }
    }
])
```

## $avg, $min, $max


```
db.users.aggregate([
    {
        $group: {
            _id: {$name : 'piyush'},
            count: {$avg: '$age'},
            record: {
                $last: '$name'
            }
        }
    },
    {
        $project: {
            _id: 0,
            count: 1,
            name: "$record"
        }
    }
])
```

## min
```
db.users.aggregate([
    {
        $group: {
            _id: '$name',
            count: {$min: '$age'},
            record: {
                $first: '$name'
            }
        }
    },
    {
        $project: {
            _id: 0,
            count: 1,
            name: "$record"
        }
    }
])
```


## max
```
db.users.aggregate([
    {
        $group: {
            _id: '$name',
            count: {$max: '$age'},
            record: {
                $first: '$name'
            }
        }
    },
    {
        $project: {
            _id: 0,
            count: 1,
            name: "$record"
        }
    }
])
```