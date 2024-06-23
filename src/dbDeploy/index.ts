/** Config */
import sequelize from "../configs/db.config";

/** Models */
import "../models/user.model";
import "../models/task.model";

sequelize
    .sync()
    .then(() => {
        console.log("Tables created successfully!");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });
