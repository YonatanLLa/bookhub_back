const { Router } = require("express");
const getFilter = require("../../handles/filter/handleFilter");

const routerFilter = Router()

routerFilter.get("/", getFilter);

module.exports = routerFilter;