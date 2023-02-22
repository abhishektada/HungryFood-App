const express = require("express");
const router = express.Router();

router.post("/getdata",async(req,res)=>{
    try {
        res.send([global.foodItem,global.foodCatagory])
    } catch (error) {
        res.send(error.massage)
    }
})

module.exports = router