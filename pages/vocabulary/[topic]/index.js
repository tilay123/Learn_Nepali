import {
  getLowerCaseTitle,
  getLessonContents,
} from "../../../helper/urlHelpers";
import nookies from "nookies";
import Cookies from "js-cookie";
export default function Levels() {
  // List all topics of read and write
  return <div>Display all Levels</div>;
}

export async function getStaticProps(ctx) {
  const { topic, page } = ctx.params;

  const cookies = nookies.get(ctx);

  console.log("cookies", cookies);
  console.log("Context", ctx);

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

// const getLessonContents = (fileName) => {
//   const filePath = path.join(process.cwd(), "data", `${fileName}.json`);
//   const content = fs.readFileSync(filePath, "utf8");
//   return JSON.parse(content);
// };
export async function getStaticPaths() {
  const fileContents = await getLessonContents("vocab");

  //  console.log("File contents", fileContents);
  var paths = fileContents.topics.map((topic) => {
    //console.log("Page Name", getLowerCaseTitle(topic.name));
    // console.log("Topic-Path", topic);
    // console.log("TopicPages", topic.pages.length);

    if (topic.length == 0) return;

    return topic.pages.map((page, index) => {
      return {
        params: {
          topic: getLowerCaseTitle(topic.name),
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
