import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

import AuthDialog from "./AuthDialogContent";
const LessonCard = ({ title, description, cardDataList, id, handleRoute }) => {
  const linearGradient = [
    ["#10ace0", "#1055e0"],
    ["#B22F72", "#8A1C7C"],
    ["#81B622", "#59981A"],
  ];
  // displaying lesson Cards ex:{Read and Write + card details}

  const matches = useMediaQuery("(min-width:250px)");

  const oneLineText = (str) => str.toLocaleLowerCase().split(" ").join("");

  const width = matches ? { width: "100%" } : {};

  return (
    <>
      <Button
        sx={{ ...{ mt: 7, mx: "auto" }, ...width }}
        // {...(matches ? { width: "100%", justifyContent: "center" } : {})}
      >
        <Box>
          <Typography
            variant="h3"
            color="text.primary"
            fontWeight="600"
            component="div"
          >
            {title} <DoubleArrowIcon fontSize="large" />
          </Typography>

          <Typography
            sx={{ textTransform: "none" }}
            variant="body2"
            color="text.primary"
          >
            {description}
          </Typography>
        </Box>
      </Button>

      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 12, sm: 8, md: 4 }}
        sx={{
          mx: "auto",
          alignItems: "center",
        }}
        {...(matches ? { width: "100%", justifyContent: "center" } : {})}
      >
        {cardDataList.map((element, index) => {
          return (
            <Grid item key={index}>
              <Card
                sx={{
                  // width: 300,
                  // minHeight: 250,
                  width: 240,
                  minHeight: 250,
                  mt: 2,
                  mx: 1,
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleRoute(
                    `/${oneLineText(title)}/${oneLineText(element.name)}/1`
                  )
                }
              >
                <Box
                  sx={{
                    p: 4,
                    background: `linear-gradient(to right bottom,${linearGradient[id][0]}, ${linearGradient[id][1]})`,
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {element.name}
                  </Typography>
                </Box>

                <CardContent>
                  {element.description && (
                    <Typography gutterBottom variant="body2" component="div">
                      {element.description}
                    </Typography>
                  )}

                  {element.examples && (
                    <Typography gutterBottom variant="body2" component="div">
                      Examples: {element.examples}
                    </Typography>
                  )}
                </CardContent>
                {/* <CardActions>
                  <Link
                    href={`/${oneLineText(title)}/${oneLineText(
                      element.name
                    )}/1`}
                    passHref
                  >
                    <Button size="small" component="a">
                      Learn
                    </Button>
                  </Link>
                </CardActions> */}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default LessonCard;
