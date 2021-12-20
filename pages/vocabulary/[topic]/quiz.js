import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import nookies from "nookies";
import { useState, useCallback, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
const vocab = require("../../../data/vocab.json");
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  getLowerCaseTitle,
  getLessonContents,
} from "../../../helper/urlHelpers";
import md5 from "../../../helper/md5";

export default function Vocabulary({ questions }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  //console.log("currentQuestion", currentQuestion);

  const [queue, setQueue] = useState(questions.slice(1));
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  console.log("currentQuestion initial ", currentQuestion);
  console.log("queue initial", queue);

  function playAudio(audioUrl) {
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

  return (
    <Container
      sx={{ justifyContent: "center", alignItems: "center", mt: 20 }}
      // onClick={console.log("currentQuestion2", currentQuestion)}
    >
      <BorderLinearProgress
        variant="determinate"
        value={
          quizCompleted
            ? 100
            : (1 - (1 + queue.length) / questions.length) * 100
        }
        sx={{ my: 5 }}
      ></BorderLinearProgress>
      <Typography sx={{ fontSize: 18, fontWeight: "600", mb: 2 }}>
        {currentQuestion.question}
        <IconButton
          aria-label="play"
          onClick={() => playAudio(currentQuestion.audio)}
        >
          <VolumeUpIcon fontSize="inherit" />
        </IconButton>
      </Typography>

      <Grid container spacing={2} sx={{ mb: 5 }}>
        {currentQuestion.options.map((option, index) => (
          <Grid key={index} item xs={12} md={6}>
            <Paper
              sx={{
                minWidth: 100,
                cursor: "pointer",

                p: 2,
                border: () => {
                  if (!submitted) return "none";

                  return submitted &&
                    md5(option.eng + process.env.NEXT_PUBLIC_answerSaltLa) ==
                      currentQuestion.correct
                    ? "2px solid green"
                    : "2px solid red";
                },
                ":hover": {
                  boxShadow: 10, // theme.shadows[20]
                },
              }}
              onClick={() => {
                const correct =
                  md5(option.eng + process.env.NEXT_PUBLIC_answerSaltLa) ===
                  currentQuestion.correct;

                setSelectedCorrectAnswer(correct);

                correct
                  ? playAudio("/assets/correct.wav")
                  : playAudio("/assets/wrong.wav");

                setSubmitted(true);
              }}
            >
              {option.eng}
            </Paper>
          </Grid>
        ))}
        {quizCompleted && <Typography>Quiz completed</Typography>}

        {submitted && (
          <Button
            sx={{ flexGrow: 1, my: 4, ml: 2 }}
            variant="outlined"
            onClick={() => {
              // setQuestionBank(questionBank);
              console.log("currentQuestion before ", currentQuestion);

              console.log("queue Length", queue.length);

              //1. more questions left
              if (queue.length > 0) {
                //3. incorrect and more questions left
                if (selectedCorrectAnswer) {
                  const newQ = queue[0];
                  setQueue((old) => {
                    old.shift();
                    return old;
                  });

                  setCurrentQuestion(newQ);

                  console.log("newQ", queue);

                  console.log("currentQuestion after ", currentQuestion);
                } else {
                  const newQ = queue[0];
                  setQueue((old) => {
                    old.shift();
                    old.push(currentQuestion);
                    return old;
                  });
                  setCurrentQuestion(newQ);
                }
              } else {
                // no more questions left
                setQuizCompleted(true);
              }

              setSubmitted(false);
            }}
          >
            Next
          </Button>
        )}
      </Grid>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const { topic } = ctx.params;

  const cookies = nookies.get(ctx);

  // console.log("pagePath-Props", getLowerCaseTitle(pageTitle));

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

  var questions = content.questions.slice((currentLevel - 1) * 10, 10);

  questions = questions.map((question) => ({
    ...question,
    correct: md5(question.correct + process.env.NEXT_PUBLIC_answerSaltLa),
  }));

  return {
    props: {
      questions: questions,
    },
  };
}
