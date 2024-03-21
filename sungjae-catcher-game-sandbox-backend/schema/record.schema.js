//Module import
const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *  schemas:
 *    Record:
 *      type: object
 *      required:
 *        - score
 *        - name
 *      properties:
 *        score:
 *          type: number
 *          default: 1177
 *        name:
 *          type: string
 *          default: JOO Sungjae Hans
 *    RecordResponse:
 *      type: object
 *      properties:
 *        score:
 *          type: number
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    RecordAllResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *           score:
 *             type: number
 *           name:
 *             type: string
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *           __v:
 *             type: number
 */

//Declaring new schema
const recordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name."],
      unique: true,
      trim: true,
    },
    score: {
      type: Number,
    },
  },
  { timestamps: true }
);

//Declaring model
const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
