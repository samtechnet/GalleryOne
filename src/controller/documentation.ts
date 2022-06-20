import { userRouteDoc } from "../routes/user";

const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "GalleryOne-App",
        version: "1.0.0",
        description: "This is backend api for Galleryone app"
    },
    servers: [
        {
        url: "http://localhost:5000",
        description: "Local Dev"
        },
        {
            url: "https://gallery-one.herokuapp.com/",
            description: "Production Dev"
        },
    ],
    tags: [
        {
            name: "User",
            description: "User routes"
        },
    ],
    paths: {
        ...userRouteDoc,
    }
}

export default swaggerDocumentation;