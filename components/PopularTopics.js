import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LessonCard from "./LessonCard";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";
import Link from "next/link";
const jsonData = require("../data/popularTopics.json");
// eslint-disable-next-line
const PopularTopics = () => {
  return (
    <>
      <Card
        sx={{
          minWidth: 240,
          maxWidth: "50%",
          mt: 2,
          mx: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 4,
            background: "linear-gradient(to right bottom, #2C5E1A, #32CD30)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            Take your first lesson!
          </Typography>
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Lesson 0
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If you&apos;re very new to Nepali, take this lesson to get started.
          </Typography>
        </CardContent>
        <CardActions>
          <Link href="/firstlesson/waystogreet" passHref>
            <Button component="a">Get Started</Button>
          </Link>
        </CardActions>
      </Card>
      <Divider sx={{ my: 2 }} />

      {jsonData.map((topic, index) => (
        <LessonCard
          key={topic.title}
          title={topic.title}
          description={topic.description}
          cardDataList={topic.data}
          id={index}
        ></LessonCard>
      ))}

      <Footer></Footer>
    </>
  );
};

export default PopularTopics;
