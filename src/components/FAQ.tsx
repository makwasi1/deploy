import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";

const faq = [
  [
    {
      id: "1",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "2",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "3",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "4",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ],
  [
    {
      id: "1",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "2",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "3",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "4",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ],
];

const data = [
  {
    title: "How it works?",
  },
  {
    title: "Comment ça marche?",
  },
];

export const FAQ: React.FC = () => {
  const { locale } = useRouter();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const { title } = data[locale === "en" ? 0 : 1];

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const {} = faq[locale === "en" ? 0 : 1];

  return (
    <Paper
      component={Stack}
      variant="outlined"
      spacing={2}
      justifyContent="center"
      sx={{ p: 2, borderRadius: 2, width: 1 }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <LiveHelpIcon />
        <Typography variant="h6" color="text.primary" fontWeight={700}>
          {title}
        </Typography>
      </Stack>
      {faq[locale === "en" ? 0 : 1].map((el, i) => (
        <Accordion
          key={i}
          expanded={expanded === `panel${i}`}
          onChange={handleChange(`panel${i}`)}
          TransitionProps={{ unmountOnExit: true }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={
              expanded === `panel${i}` ? (
                <KeyboardArrowUpIcon sx={{ color: "accent.main" }} />
              ) : (
                <KeyboardArrowRightIcon sx={{ color: "accent.main" }} />
              )
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ borderTop: "none" }}
          >
            <Typography color="accent.main" fontWeight={600}>
              {el?.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="accent.main">{el.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};
