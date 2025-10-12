import { createRequire } from "module";

const require = createRequire(import.meta.url);
const createCheckoutSessionHandler = require("../../shared/createCheckoutSession");

export default createCheckoutSessionHandler;
