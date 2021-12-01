import path from "path";
import fs from "fs";

export default function ReadAndWrite({ pageContent }) {
  console.log("page Content", pageContent);
  return <div>Read and and write</div>;
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

  if (isNaN(page) || content.pages[Number(page) - 1] == null)
    return {
      notFound: true,
    };

  content = content.pages[Number(page) - 1];

  console.log(`"topic-Props: ", ${topic} content: ${content} page:${page}`);

  return {
    props: {
      pageContent: content,
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
