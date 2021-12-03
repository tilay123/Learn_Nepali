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

export default function ReadAndWrite({ pageContent, links }) {
  // console.log("page Content", pageContent);
  // console.log("links", links);
  return (
    <>
      <Box sx={{ flex: "1", display: { xs: "flex", sm: "none" }, mr: 2 }}>
        <IconButton sx={{ ml: "auto" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexDirection: "row", display: "flex" }}>
        <Paper
          sx={{
            width: 300,
            m: 1,
            height: "100%",

            display: { xs: "none", sm: "block" },
          }}
        >
          <List component="nav" sx={{ position: "fixed" }} aria-label="\">
            <Box
              sx={{ display: "flex", flexDirection: "column", pl: 2, pt: 2 }}
            >
              <Typography fontWeight="700">Table of Contents</Typography>

              {links.map((link, index) => (
                <Link
                  key={link.title}
                  href={decodeURIComponent(link.url)}
                  passHref
                >
                  <MuiLink>{`${index + 1}. ${link.title}`}</MuiLink>
                </Link>
              ))}
            </Box>
          </List>
        </Paper>
        <Container sx={{ mt: 1 }}>
          <Typography variant="h3" fontWeight="700" sx={{ mb: 6 }}>
            {pageContent.title}
          </Typography>
          {pageContent.pageData.map((pageData, index) => (
            <Displayer key={index} data={pageData}></Displayer>
          ))}
        </Container>
      </Box>

      <Footer></Footer>
    </>
  );
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

  const fileContents = await getLessonContents("readandwrite");

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
    url: encodeURIComponent(`/readandwrite/${topic}/${index + 1}`),
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
  const fileContents = await getLessonContents("readandwrite");

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
