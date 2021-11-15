import express from "express";
import { addDummyGuestbookSignatures, addGuestbookSignature, getAllGuestbookSignatures, getGuestbookSignatureById, GuestbookSignature } from "./db";

// loading in some dummy signatures into the database
// (comment out if desired, or change the number)
addDummyGuestbookSignatures(20);

const app = express();
/** Parses JSON data in a request automatically */
app.use(express.json());

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

// GET /signatures
app.get("/signatures", (req, res) => {
  const allSignatures = getAllGuestbookSignatures();
  res.status(200).json(allSignatures);
})

// POST /signatures
app.post<{}, {}, GuestbookSignature>("/signatures", (req, res) => {
  // to be rigorous, ought to handle non-conforming request bodies
  // ... but omitting this as a simplification
  const postData = req.body;
  const createdSignature = addGuestbookSignature(postData);
  res.status(201).json(createdSignature);
});

// GET /signatures/:id
app.get<{ id: string }>("/signatures/:id", (req, res) => {
  const matchingSignature = getGuestbookSignatureById(parseInt(req.params.id));
  res.status(200).json(matchingSignature)
})

// DELETE /signatures/:id
app.delete<{ id: string }>("/signatures/:id", (req, res) => {
  const matchingSignature = getGuestbookSignatureById(parseInt(req.params.id));
  res.status(200).json(matchingSignature)
})

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});