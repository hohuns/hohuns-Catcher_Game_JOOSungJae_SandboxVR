//Module import
const express = require("express");
const recordController = require("../controllers/recordController");

//Creating Subapp for resources
const router = express.Router();

//Route
/**
 * @openapi
 * /api/records/check:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/check", recordController.checkConnection);
router
  .route("/")
  /**
   * @openapi
   * '/api/records':
   *  get:
   *     tags:
   *     - Record
   *     summary: Get all records
   *     requestBody:
   *      required: false
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RecordAllResponse'
   *      400:
   *        description: Bad request
   */
  .get(recordController.getAllRecords)
  /**
   * @openapi
   * '/api/records':
   *  post:
   *     tags:
   *     - Record
   *     summary: Register a record with nickname and score
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/Record'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RecordResponse'
   *      400:
   *        description: Bad request
   */
  .post(recordController.creatRecord);
/**
 * @openapi
 * '/api/records/{recordId}':
 *  delete:
 *     tags:
 *     - Record
 *     summary: Delete a single record
 *     parameters:
 *      - name: recordId
 *        in: path
 *        description: The id of the record
 *        required: true
 *     responses:
 *       200:
 *         description: record deleted
 *       404:
 *         description: Product not found
 */
router.route("/:id").delete(recordController.deleteRecord);

module.exports = router;
