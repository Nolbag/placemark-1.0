export const serviceUrl = "http://localhost:3000";

export const testUsers = [
  {
  firstName: "Maggie",
  lastName: "Simpson",
  email: "maggie@simpson.com",
  password: "secret"
  },  
  {
    firstName: "Homer",
    lastName: "Simpson",
    email: "homer@simpson.com",
    password: "secret"
  },
  {
    firstName: "Marge",
    lastName: "Simpson",
    email: "marge@simpson.com",
    password: "secret"
  },
  {
    firstName: "Bart",
    lastName: "Simpson",
    email: "bart@simpson.com",
    password: "secret"
  }
];

export const testTrail = {
  name: "Test Woodland/Forest Walk",
  category: "Woodland/Forest",
  format: "Loop",
  difficulty: "Easy",
  location: "Test County",
  latitude: 53.0,
  longitude: -8.0,
  distance: 4.2,
  duration: 75,
};

export const secondTestTrail = {
  name: "Test Lakeside Walk",
  category: "Lakeside/Riverside",
  format: "Out and Back",
  difficulty: "Moderate",
  location: "Test County",
  latitude: 53.1,
  longitude: -8.1,
  distance: 6.3,
  duration: 105,
};

export const testTrails = [testTrail, secondTestTrail];