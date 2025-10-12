import { createRequire } from "module";

const require = createRequire(import.meta.url);
const handler = require("../../../api/contact/submit.js");

export default handler;
