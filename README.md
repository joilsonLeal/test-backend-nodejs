# Backend Analyst Candidate Testing

Project developed during a backend analyst challenge for Anota Ai. [Challenge](https://github.com/anotaaidev/test-backend-nodejs/)

## Get Started

Before you begin, you will need to have the following tool installed on your machine [Git](https://git-scm.com). </br>
In addition to having an editor to work with the code like [VSCode](https://code.visualstudio.com/). </br>
And to execute mongodb and redis you'll need docker and docker-compose [Docker](https://www.docker.com). </br>
Or mongodb and redis installed on your machine.

```shell
# clone this repository
git clone https://github.com/joilsonLeal/test-backend-nodejs

# select repository
cd test-backend-nodejs

# install dependencies
npm install

# execute docker compose
docker compose up -d

# start application
npm run start
```
## Structure

```
.
├── config files
├── index.js
├── src
    ├── controllers
        ├── CategoryController.js
        └── ProductController.js
    ├── database
        └── config.js
    ├── exceptions
        └── ApplicationException.js
    ├── models
        ├── Category.js
        └── Product.js
    ├── services
        ├── CategoryService.js
        └── ProductService.js
    ├── utils
        └── CacheUtil.js
    ├── server.js
    └── routes.js
```

## Testing

```shell
# run unit tests
npm run test

# run coverage
npm run coverage
```

## API
### Get Categories
Return all registered categories.
```shell
[GET] /category
```
Response example: </br>
Status: 200
```JSON
[{
  "_id": "60b3d71b58104b3dbc7b9cc6",
  "name": "Computer Components"
}]
```
Status: 500
```JSON
{
  "error": "Internal error."
}
```
### Create new Category
Create new Category
```shell
[POST] /category
```
Body exemplo:
```JSON
{
  "name": "Computer Components"
}
```
Response example:</br>
Status: 201
```JSON
{
  "_id": "60b3d71b58104b3dbc7b9cc6",
  "name": "Computer Components"
}
```
Status: 400
```JSON
{
  "error": ["Name is required."]
}
```
Status: 500
```JSON
{
  "error": "Internal error."
}
```
### Get Products
Return a list with all products.
```shell
[GET] /products
```
Response example:</br>
Status: 200
```JSON
[{
  "_id": "60b3f145636d8012887d3d9d",
  "title": "SAMSUNG 870 EVO 1TB",
  "description": "SAMSUNG 870 EVO 1TB 2.5 Inch SATA III Internal SSD (MZ-77E1T0B/AM)",
  "price": 114.99,
  "category": {
    "_id": "60b3ea32d4250704b42748c3",
    "name": "Computer Components"
  }
}]
```
Status: 500
```JSON
{
  "error": "Internal error."
}
```
### Filter products by category or name
Return a list with all products filtered by category or name.
```shell
[GET] /product?category=Computer Components
[GET] /product?name=SAMSUNG 870 EVO 1TB
```
Response example:</br>
Status: 200
```JSON
[{
  "_id": "60b3f145636d8012887d3d9d",
  "title": "SAMSUNG 870 EVO 1TB",
  "description": "SAMSUNG 870 EVO 1TB 2.5 Inch SATA III Internal SSD (MZ-77E1T0B/AM)",
  "price": 114.99,
  "category": {
    "_id": "60b3ea32d4250704b42748c3",
    "name": "Computer Components"
  }
}]
```
Status: 400
```JSON
{
  "error": [
    "Name or Category is required."
  ]
}
```
Status: 404
```JSON
{
  "error": "Category not found."
}
```
Status: 500
```JSON
{
  "error": "Internal error."
}
```
### Create new Product
Create new product for the catalog.
```shell
[POST] /product
```
Body exemplo:
```JSON
{
  "title": "SAMSUNG 870 EVO 1TB",
  "description": "SAMSUNG 870 EVO 1TB 2.5 Inch SATA III Internal SSD (MZ-77E1T0B/AM)",
  "price": 114.99,
  "category": "Computer Components"
}
```
Response example:</br>
Status: 200
```JSON
[{
  "_id": "60b3f145636d8012887d3d9d",
  "title": "SAMSUNG 870 EVO 1TB",
  "description": "SAMSUNG 870 EVO 1TB 2.5 Inch SATA III Internal SSD (MZ-77E1T0B/AM)",
  "price": 114.99,
  "category": {
    "_id": "60b3ea32d4250704b42748c3",
    "name": "Computer Components"
  }
}]
```
Status: 400
```JSON
{
  "error": [
    "Title is required.",
    "Description is required.",
    "Price is required.",
    "Category is required."
  ]
}
```
Status: 404
```JSON
{
  "error": "Category not found."
}
```
Status: 500
```JSON
{
  "error": "Internal error."
}
```
### Update a Product's Information
Update a product's information'.
```shell
[PUT] /product/:id
```
Body exemplo:
```JSON
{
  "title": "SAMSUNG 870 EVO 1TB",
  "description": "SAMSUNG 870 EVO 1TB 2.5 Inch SATA III Internal SSD (MZ-77E1T0B/AM)",
  "price": 114.99
}
```
Response example:</br>
Status: 200
```JSON
[{
  "_id": "60b3f145636d8012887d3d9d",
  "title": "SAMSUNG 870 EVO 1TB",
  "description": "SAMSUNG 870 EVO 1TB 2.5 Inch SATA III Internal SSD (MZ-77E1T0B/AM)",
  "price": 114.99,
  "category": {
    "_id": "60b3ea32d4250704b42748c3",
    "name": "Computer Components"
  }
}]
```
Status: 400
```JSON
{
  "error": [
    "Title is required.",
    "Description is required.",
    "Price is required."
  ]
}
```
Status: 500
```JSON
{
  "error": "Internal error."
}
```
### Update a Product's Category
Update a product's category.
```shell
[PUT] /product/:id/category
```
Body exemplo:
```JSON
{
  "category": "Computer Components"
}
```
Response example:</br>
Status: 200
```JSON
[{
  "_id": "60b3f145636d8012887d3d9d",
  "title": "SAMSUNG 870 EVO 1TB",
  "description": "SAMSUNG 870 EVO 1TB 2.5 Inch SATA III Internal SSD (MZ-77E1T0B/AM)",
  "price": 114.99,
  "category": {
    "_id": "60b3ea32d4250704b42748c3",
    "name": "Computer Components"
  }
}]
```
Status: 400
```JSON
{
  "error": [
    "Category is required."
  ]
}
```
Status: 404
```JSON
{
  "error": "Category not found."
}
```
Status: 500
```JSON
{
  "error": "Internal error."
}
```
### Delete Product
Remove a product from the catalog.
```shell
[DELETE] /product/:id
```
Response example:</br>
Status: 200
```JSON
{
  "message": "Product removed with success."
}
```
Status: 400
```JSON
{
  "error": [
    "Id is required."
  ]
}
```
Status: 404
```JSON
{
  "error": "Product not found."
}
```
Status: 500
```JSON
{
  "error": "Internal error."
}
```

## Technologies and tools

The project was developed using the following technologies

- Nodejs v14.15.1
- express
- jest
- vscode
- docker
- mongodb
- redis