import path from "path";
import fs from "fs";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import Footer from "../../../components/Footer";
import Displayer from "../../../helper/Displayer";
import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function Vocabulary({ pageContent, links }) {
  // console.log("page Content", pageContent);
  // console.log("links", links);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const toggleDrawer = () => setDialogIsOpen(!dialogIsOpen);

  return <Container>Hello</Container>;
}

const getUrlFromTitle = (lessonPath, pathName) =>
  `/${lessonPath}/` + pathName.toLocaleLowerCase().split(" ").join("");

const getLowerCaseTitle = (str) => str.toLocaleLowerCase().split(" ").join("");

const getLessonContents = (fileName) => {
  const filePath = path.join(process.cwd(), "data", `${fileName}.json`);
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
};

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
    fallback: "blocking",
  };
}
