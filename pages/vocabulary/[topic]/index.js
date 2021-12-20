import {
  getLowerCaseTitle,
  getLessonContents,
} from "../../../helper/urlHelpers";
import nookies from "nookies";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import useMediaQuery from "@mui/material/useMediaQuery";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
export default function Levels({ date, level, total }) {
  // List all topics of read and write

  const matches = useMediaQuery("(min-width:220px)");

  return (
    <Container sx={{ p: 2 }}>
      <div>
        Display all Levels{" "}
        {`${date} CurrentLevel: ${level} totalLevels:${total}`}
      </div>
      <Timeline position={matches ? "alternate" : "right"}>
        {Array.from(Array(10).keys()).map((itm, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                {index == 0 ? <LockOpenIcon /> : <LockIcon />}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: 500 }}>10 Words</Typography>
                <Typography>Learn 10 new words.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const { topic } = ctx.params;
  console.log("topic", topic);

  const cookies = nookies.get(ctx);

  console.log("Time", new Date());
  //console.log("cookies", cookies.token);
  // console.log("pagePath-Props", getLowerCaseTitle(pageTitle));

  // getAuth()
  // .verifyIdToken(idToken)
  // .then((decodedToken) => {
  //   const uid = decodedToken.uid;
  //   // ...
  // })
  // .catch((error) => {
  //   // Handle error
  // });

  const fileContents = await getLessonContents("vocab");

  var content = fileContents.topics.find(
    (tpx) => topic === getLowerCaseTitle(tpx.name)
  );

  if (!topic || !content) {
    return {
      notFound: true,
    };
  }

  const currentLevel = 1;

  const totalLevels = Math.ceil(content.questions.length / 2);

  // const pageTitles = content.pages.map((pg, index) => ({
  //   title: pg.title,
  //   url: encodeURIComponent(`/vocab/${topic}/${index + 1}`),
  // }));

  return {
    props: {
      date: new Date().toISOString(),
      level: currentLevel,
      total: totalLevels,
    },
  };
}
