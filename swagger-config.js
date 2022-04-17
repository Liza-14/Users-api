const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Guard",
      version: "1.0.0",
      description: "Users API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
      {
        url: "https://lit-retreat-93907.herokuapp.com",
      },
      {
        url: "https://my-guard.herokuapp.com",
      },
    ],
  },
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{
    jwt: [],
  }],
  apis: ["./src/routes/users.js"],
};

module.exports = { options };
