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
import { AuthContext } from "../context/AuthContext";
import Dialog from "@mui/material/Dialog";
import { useContext, useState } from "react";
import AuthDialogContent from "./AuthDialogContent";
import { useRouter } from "next/router";

// eslint-disable-next-line
const PopularTopics = () => {
  const { state } = useContext(AuthContext);
  const [authDialogIsOpen, setAuthDialogIsOpen] = useState(false);

  const router = useRouter();

  const toggleDialog = () => setAuthDialogIsOpen(!authDialogIsOpen);

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
          handleRoute={(url) => {
            console.log("URLLL", url);
            if (state.user) {
              console.log("User logged in");
              router.replace(url);
            } else {
              console.log("User NOT logged in");
              toggleDialog();
            }
          }}
        ></LessonCard>
      ))}
      <Dialog
        open={authDialogIsOpen}
        onClose={toggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AuthDialogContent toggleDialog={toggleDialog} />
      </Dialog>

      <Footer></Footer>
    </>
  );
};

export default PopularTopics;
