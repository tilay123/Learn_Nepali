// import path from "path";
// import fs from "fs";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import Footer from "../../../components/Footer";
import Displayer from "../../../helper/Displayer";
import { useState, useEffect, useContext } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
const vocab = require("../../../data/vocab.json");
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { QuestionContext } from "../../../context/QuestionContext";
import {
  getLowerCaseTitle,
  getLessonContents,
} from "../../../helper/urlHelpers";
export default function Vocabulary({ pageContent, links }) {
  // console.log("page Content", pageContent);
  // console.log("links", links);

  console.log("NEXT_PUBLIC_answerSaltLa", process.env.NEXT_PUBLIC_answerSaltLa);

  const { fetchQuestions, questions } = useContext(QuestionContext);
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  console.log("questions", questions);

  function playAudio() {
    const audioUrl = vocab.topics[0].questions[0].audio;
    console.log("playing", audioUrl);

    const audio = new Audio(audioUrl);
    audio.play();
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#32CD32" : "	#006400",
    },
  }));

  //console.log("vocab", vocab);

  return (
    <Container sx={{ justifyContent: "center", alignItems: "center", mt: 20 }}>
      <BorderLinearProgress
        variant="determinate"
        value={50}
        sx={{ my: 5 }}
      ></BorderLinearProgress>
      <Typography sx={{ fontSize: 18, fontWeight: "600", mb: 2 }}>
        Question will go here.Question will go here.Question will go
        here.Question will go here. really?
        <IconButton aria-label="play" onClick={playAudio}>
          <VolumeUpIcon fontSize="inherit" />
        </IconButton>
      </Typography>

      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[1, 3, 8, 15].map((num) => (
          <Grid key={num} item xs={12} md={6}>
            <Paper
              sx={{
                minWidth: 100,
                cursor: "pointer",
                p: 2,
                //border: "1px solid gray",
                ":hover": {
                  boxShadow: 10, // theme.shadows[20]
                },
              }}
              onClick={() => console.log("ans1 clicked")}
            >
              {"answer ".repeat(num)}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// const getUrlFromTitle = (lessonPath, pathName) =>
//   `/${lessonPath}/` + pathName.toLocaleLowerCase().split(" ").join("");

// const getLowerCaseTitle = (str) => str.toLocaleLowerCase().split(" ").join("");

// const getLessonContents = (fileName) => {
//   const filePath = path.join(process.cwd(), "data", `${fileName}.json`);
//   const content = fs.readFileSync(filePath, "utf8");
//   return JSON.parse(content);
// };

export async function getStaticProps({ params }) {
  const { topic, page } = params;

  // console.log("pagePath-Props", getLowerCaseTitle(pageTitle));

  const fileContents = await getLessonContents("vocab");

  var content = fileContents.topics.find(
    (tpx) => topic === getLowerCaseTitle(tpx.name)
  );

  if (!topic || !content || !page) {
    return {
      notFound: true,
    };
  }

  if (
    isNaN(page) ||
    content?.pages == null ||
    content.pages[Number(page) - 1] == null
  )
    return {
      notFound: true,
    };

  const pageTitles = content.pages.map((pg, index) => ({
    title: pg.title,
    url: encodeURIComponent(`/vocab/${topic}/${index + 1}`),
  }));

  content = content.pages[Number(page) - 1];

  console.log(`"topic-Props: ", ${topic} content: ${content} page:${page}`);

  return {
    props: {
      pageContent: content,
      links: pageTitles,
    },
    revalidate: false,
  };
}

export async function getStaticPaths() {
  const fileContents = await getLessonContents("vocab");

  //  console.log("File contents", fileContents);
  var paths = fileContents.topics.map((topic) => {
    //console.log("Page Name", getLowerCaseTitle(topic.name));
    // console.log("Topic-Path", topic);
    // console.log("TopicPages", topic.pages.length);

    if (topic.length == 0 || topic?.pages?.length == null) return;

    return topic.pages.map((page, index) => {
      return {
        params: {
          topic: getLowerCaseTitle(topic.name),
          page: String(index + 1),
        },
      };
    });
  });

  paths = [].concat.apply([], paths).filter((x) => x != null);

  console.log("paths", paths);
  return {
    paths,
    // fallback: "blocking",
    fallback: false,
  };
}
