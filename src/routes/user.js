const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// create user
/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *       type: object
 *       properties:
 *        name:
 *          type: string 
 *          format: the user name
 *        age:
 *          type:number
 *           description:the user age 
 *       required:
 *        - name
 *        - age
 *        - race
 *       example:
 *        name: Nina
 *         age:2
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *  responses:
 *    200:
 *      description: new user created!
 */

router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
});

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: return all users
 *    tags: [User]
 *    responses:
 *       200:
 *         description: all user 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users' 
 */

router.get("/users", (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
});

// get a user
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: return a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type:string
 *        required:true
 *        description: the user id 
 *    responses:
 *      200:
 *        description: all users 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        descrption: user not found
 *  
 */
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
       .findById(id)
       .then((data) => res.json(data))
       .catch((error) => res.json({message:error}));
});

// update a user
/**
 * @swagger
 * /api/users/{id}
 *  put:
 *  summary: update a user
 *    tags: [User]
 *    parametrs:
 *         - in: path
 *           name: id
 *           schema:
 *             type:string
 *             description: the user id 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: user updated
 *       404:
 *         descrption: user not found
 */
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const{name, age, telefone, race} = req.body;
    userSchema
       .updateOne({_id: id}, { $set: {name, age, telefone, race} })
       .then((data) => res.json(data))
       .catch((error) => res.json({message:error}));
});

//delete a user
/**
 * @swagger
 * /api/users/{id}
 *  delete:
 *    summary: delete a user
 *    tags: [User]
 *    parametrs:
 *      - in: path
 *        name: id
 *        schema:
 *          type:string
 *        required:true
 *        description: the user id 
 *    responses:
 *      200:
 *        description: user deleted
 *      404:
 *        descrption: user not found
 */
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
       .deleteOne({_id: id})
       .then((data) => res.json(data))
       .catch((error) => res.json({message:error}));
});

module.exports = router;