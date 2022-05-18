import express from 'express';
import consign from "consign";
// import mongose from 'mongoose';

const PORT = 3000;
const app =  express();

// app.mongoose = mongose;


consign()
    .include("libs/db.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);
