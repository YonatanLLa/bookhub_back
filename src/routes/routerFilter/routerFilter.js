const { Router } = require("express");
const getFilter = require("../../handlers/filter/handleFilter");

const routerFilter = Router()

routerFilter.get("/", getFilter);

module.exports = routerFilter;