# Placemark

## Project Description

Placemark is a web application for discovering and managing day-walking trails in the Republic of Ireland.

Users can sign in, browse trails, filter them by category, format, and difficulty, view trail locations on a map, upload trail images, and manage trail records.

The application was created for the web app dev module on the HDip in Computer Science at SETU.

## Features

- User registration and sign in
- Session-based web authentication
- JWT authentication for the REST API
- Create, view, update, and delete trails
- Filter trails by category, format, and difficulty
- View trail locations using Leaflet and OpenStreetMap
- Upload trail images using Cloudinary
- MongoDB persistence through Mongoose
- Swagger API documentation
- Model and API tests

## Application

The web application is available at:

```text
https://placemark-1-0-xsnz.onrender.com/
```

Swagger documentation is available at:

```text
https://placemark-1-0-xsnz.onrender.com/documentation
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Nolbag/placemark-1.0.git
cd placemark-1.0
```

### Install dependencies

```bash
npm install --force
```

### Configure environment variables

Create a `.env` file in the project root using the .env_example file as a reference.

### Start the application

```bash
npm run dev
```

## Project Structure

```text
placemark-1.0/
├── src/
│   ├── api/              REST API helpers and JWT utilities
│   ├── controllers/      Web request controllers
│   ├── models/           MongoDB, JSON, and memory stores
│   ├── views/            Handlebars views and partials
│   ├── api-routes.js     REST API routes
│   ├── web-routes.js     Web routes
│   └── server.js         Hapi server setup
├── test/
│   ├── api/              API tests
│   ├── models/           Model tests
│   ├── fixtures.js       Test data
│   └── test-utils.js     Test helpers
├── package.json
└── README.md
```

## Technologies

- Node
- Hapi
- Handlebars
- Bulma
- MongoDB
- Mongoose
- Cloudinary
- Leaflet
- OpenStreetMap
- Joi
- JWT
- Mocha
- Chai
- Axios
