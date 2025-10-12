import { createRequire } from "module";

const require = createRequire(import.meta.url);
const handler = require("../../../api/connect/account-link.js");

export default handler;
