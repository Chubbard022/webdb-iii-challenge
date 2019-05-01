const express = require("express");
const helmet = require("helmet");
const cohortRouter = require("../cohorts/cohorts-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/cohort",cohortRouter);

module.exports = server;