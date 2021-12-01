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
import Footer from "../../components/Footer";
const firstLessonJson = require("../../data/lesson0.json");
import { useRouter } from "next/router";
import Displayer from "../../helper/Displayer";

const getUrlFromTitle = (title) =>
  "/firstlesson/" + title.toLocaleLowerCase().split(" ").join("");

async function getFileFirstLessonContents() {
  const filePath = path.join(process.cwd(), "data", "lesson0.json");
  const content = await fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
}
export default function FirstLesson({ data }) {
  const { asPath, pathname } = useRouter();
  console.log("asPath", asPath); // '/blog/xyz'
  console.log("pathname", pathname); // '/blog/[slug]'

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

              {firstLessonJson.map((lesson, index) => (
                <Link
                  key={lesson.title}
                  href={getUrlFromTitle(lesson.title)}
                  passHref
                >
                  <MuiLink>{`${index + 1}. ${lesson.title}`}</MuiLink>
                </Link>
              ))}
            </Box>
          </List>
        </Paper>
        <Container sx={{ mt: 1 }}>
          <Typography variant="h3" fontWeight="700" sx={{ mb: 6 }}>
            {data.title}
          </Typography>

          {data.data.map((excerpt, index) => {
            return <Displayer key={index} data={excerpt}></Displayer>;
          })}
        </Container>
      </Box>

      <Footer></Footer>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { subject } = params;

  const fileContents = await getFileFirstLessonContents();

  const content = fileContents.find(
    (chapter) =>
      subject === chapter.title.toLocaleLowerCase().split(" ").join("")
  );

  console.log(`"subject: ", ${subject} content: ${content}`);

  if (!subject || !content) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: content,
    },
    revalidate: false,
  };
}

export async function getStaticPaths() {
  const fileContents = await getFileFirstLessonContents();
  const paths = fileContents.map((chapter) => ({
    params: {
      subject: getUrlFromTitle(chapter.title),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
