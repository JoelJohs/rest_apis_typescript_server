import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI, { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "Product management",
      },
    ],
    info: {
      title: "REST API nodejs with Express and TypeScript",
      version: "1.0.0",
      description:
        "API Docs for the REST API nodejs with Express and TypeScript",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUIOptions: SwaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

export default swaggerSpec;
export { swaggerUIOptions };
