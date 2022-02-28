import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetails = (props) => {
  console.log({ props });

  //test revert
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pxoio.mongodb.net/meetups?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(uri);
  const collection = client.db("meetups").collection("meetups");
  const meetups = await collection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((el) => ({
      params: { meetupId: el._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data from api or other and regenerate by revalidate
  // alterantively getServerSideProps for rendering every request, can use context to accesss req and res
  const meetupId = context.params.meetupId;

  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pxoio.mongodb.net/meetups?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(uri);
  const collection = client.db("meetups").collection("meetups");
  const singleMeetup = await collection.findOne({ _id: ObjectId(meetupId) });
  client.close();

  return {
    props: {
      meetupData: {
        title: singleMeetup.title,
        description: singleMeetup.description,
        image: singleMeetup.image,
        address: singleMeetup.address,
      },
    },
  };
}

export default MeetupDetails;
