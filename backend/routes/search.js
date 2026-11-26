const express = require('express');
const {rateLimit} = require('express-rate-limit');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 100;
const PAGE_SIZE = 10;
const MAX_PAGE = 1000;

const searchLimiter = rateLimit({
    windowMs: 60*1000,
    limit:60,
    standardHeaders:'dradt-8',
    legacyHeaders:false,
    message:{
        error:'Too many searches. Please try again in a minute.',
    },
});

function escapeRegExp(value){
    return value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
}

function parsePositiveInteger(value, fallback, max){
    if(typeof value !== "string" || !/^\d+$/.test(value))
    {
        return fallback;

    }
    const number = Number(value);
    if(!Number.isSafeInteger(number) || number < 1){
        return fallback;
    }
    return Math.min(number, max);

}

router.get('/search', searchLimiter, async(req, res) => {
    try{
        if(req.query.q !== undefined && typeof req.query.q !== 'string')
    }
}