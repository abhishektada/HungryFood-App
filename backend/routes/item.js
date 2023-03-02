const express = require("express");
const itemSchema = require("../schema/item");
const catogorySchema = require("../schema/category");
const router = express.Router();

router.post("/additem", async (req, res) => {
  try {
    const catagoryMetch = await catogorySchema.findOne({
      CategoryName: req.body.CategoryName,
    });
    const itemMetch = await itemSchema.findOne({
      name: req.body.name,
    });

    if (!catagoryMetch && !itemMetch) {
      await catogorySchema.create({
        CategoryName: req.body.CategoryName,
      });
      await itemSchema.create({
        CategoryName: req.body.CategoryName,
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        options: req.body.options,
      });
      res.json({ success: true });
    } else {
      res.json({ success: false, msg: "Item or Category already exist" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
