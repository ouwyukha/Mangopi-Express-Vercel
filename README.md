# Mangopi-Express-Vercel
CRUD API using Express Framework connected to MongoDB on Atlas and deployed on Vercel

Live Demo URL : https://mangopi-express-vercel.vercel.app/ (Don't worry, you will get 404 if trying to open it directly, it's intentional)

## Request List:

Task | Command
------------ | -------------
Find All Users | /api/findAllUsers/
Find User by ID | /api/findAllUsers/{id}
Insert User | /api/insertUser/
Update User by ID | /api/updateUser/{id}
Delete User by ID | /api/delete/{id}
Find User(s) by Name | /api/findByName/{name}

Example
```
https://mangopi-express-vercel.vercel.app/api/findAllUsers
```

## Note
Due to unknown reason, I have to put all of the code on one file, [index.js](https://github.com/ouwyukha/Mangopi-Express-Vercel/blob/main/api/index.js).
When i tried to modularize the components, MangoClient won't connect to Mongo Atlas at all. This problem doesn't exist on Local Database.
