const express = require("express");
const helmet = require("helmet");
const cohortRouter = require("../routes/cohorts/cohorts-router");
const studentRouter = require("../routes/students/students-router")

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/cohort",cohortRouter);
server.use("/api/student",studentRouter)
module.exports = server;