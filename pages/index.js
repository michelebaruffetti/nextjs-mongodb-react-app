import MeetupList from "../components/meetups/MeetupList";

const fakemeet = [
  {
    id: 1,
    title: "first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Prague_Skyline.jpg/1920px-Prague_Skyline.jpg",
    address: "fake address, 15",
    description: "fake meetup description",
  },
  {
    id: 2,
    title: "first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Prague_Skyline.jpg/1920px-Prague_Skyline.jpg",
    address: "fake address, 234",
    description: "fake meetup description 2",
  },
  {
    id: 3,
    title: "first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Prague_Skyline.jpg/1920px-Prague_Skyline.jpg",
    address: "fake address, 19",
    description: "fake meetup description 3",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export async function getStaticProps() {
  //fetch data from api or other and regenerate by revalidate
  // alterantively getServerSideProps for rendering every request, can use context to accesss req and res

  return {
    props: {
      meetups: fakemeet,
    },
    revalidate: 10,
  };
}

export default HomePage;
