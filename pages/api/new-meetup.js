// route api/new-meetup to insert in POST a new meetup event
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pxoio.mongodb.net/meetups?retryWrites=true&w=majority`;

  if (req.method === "POST") {
    const data = req.body;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect(async (err) => {
      if (err) throw err;
      try {
        const collection = client.db("meetups").collection("meetups");
        const result = await collection.insertOne(data);
        console.log("data inserted: ", result);
        client.close();
        res.status(201).json({ message: "meetup inserted!" });
      } catch (error) {
        console.log("a Db insert occurred: ", error);
      }
    });
  }
};

export default handler;
