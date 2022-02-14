export const options = {
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
    ],
  },
  apis: ["./src/routes/users.js"],
};
