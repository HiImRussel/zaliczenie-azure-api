/** Seeders */
import seedUsers from "./users.seeder";

const seeders = async () => {
    await seedUsers();
};

seeders();
