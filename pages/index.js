import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Nextjs - React - MongoDb Test Meetup</title>
        <meta
          name="description"
          content="A test app using nextjs, react, mongodb"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  //fetch data from api or other and regenerate by revalidate
  // alterantively getServerSideProps for rendering every request, can use context to accesss req and res

  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pxoio.mongodb.net/meetups?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(uri);
  const collection = client.db("meetups").collection("meetups");
  const meetups = await collection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((el) => ({
        id: el._id.toString(),
        title: el.title,
        description: el.description,
        image: el.image,
        address: el.address,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
