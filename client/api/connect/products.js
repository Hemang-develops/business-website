import { createRequire } from "module";

const require = createRequire(import.meta.url);
const handler = require("../../../api/connect/products.js");

export default handler;
