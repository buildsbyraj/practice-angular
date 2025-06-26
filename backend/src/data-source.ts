import {DataSource} from "typeorm"
import { usersEntity } from "./entities/user.entities";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "database",
    // entities: [__dirname + "/**/*.entities{.ts,.js}"],
    entities: [usersEntity],
    synchronize: false,
    logging: true,
    subscribers: [],
    migrations: [],
    extra: {
        authPlugins: { mysql_native_password: true }
    }
});
