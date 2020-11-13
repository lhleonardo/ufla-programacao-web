import knex from "knex";

import * as config from "../../knexfile.js";

export default knex(config.development);
