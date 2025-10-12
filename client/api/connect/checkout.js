import { createRequire } from "module";

const require = createRequire(import.meta.url);
const handler = require("../../../api/connect/checkout.js");

export default handler;
