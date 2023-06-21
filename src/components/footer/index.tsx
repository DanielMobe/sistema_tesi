import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";

const SocialMediaButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <IconButton>
        <Box color="white">{children}</Box>
      </IconButton>
    </Box>
  );
};

const Footer = () => {
  const isMd = useMediaQueryUpHook("md");

  return (
    <Box
      width="100%"
      paddingY="1rem"
      bgcolor="#232033"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width={isMd ? "52%" : "100%"}
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        color="white"
      >
        <Typography variant="h3">
          <Box fontWeight={900} textAlign="center" marginBottom="1rem">
            TECNOLÓGICO DE ESTUDIOS SUPERIORES DE IXTAPALUCA
          </Box>
        </Typography>
        <Typography>
          <Box fontSize="0.9rem" color="#ffffff80" marginBottom="1rem">
            #COMUNIDADTESI
          </Box>
        </Typography>
        <Typography variant="caption">
          <Box fontSize="0.9rem" color="#ffffff80" marginBottom="1rem">
            SIGUENOS EN:
          </Box>
        </Typography>
        <Box width="60%">
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item md={2} xs={4}>
              <SocialMediaButton>
                <FacebookIcon fontSize="large" />
              </SocialMediaButton>
            </Grid>
            <Grid item md={2} xs={4}>
              <SocialMediaButton>
                <TwitterIcon fontSize="large" />
              </SocialMediaButton>
            </Grid>
            <Grid item md={2} xs={4}>
              <SocialMediaButton>
                <LinkedInIcon fontSize="large" />
              </SocialMediaButton>
            </Grid>
            <Grid item md={2} xs={4}>
              <SocialMediaButton>
                <PinterestIcon fontSize="large" />
              </SocialMediaButton>
            </Grid>
            <Grid item md={2} xs={4}>
              <SocialMediaButton>
                <RssFeedIcon fontSize="large" />
              </SocialMediaButton>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
        <Divider style={{ width: "100%", backgroundColor: "#2c293d" }} />
        <Typography variant="caption">
          <Box
            fontSize="0.9rem"
            color="#ffffff80"
            textAlign="center"
            marginTop="1rem"
          >
            Km. 7 de la carretera Ixtapaluca-Coatepec s/n San Juan, Distrito de
            Coatepec, Ixtapaluca, Estado de México C.P.56580, Tel.
            59-88-05-55..2019
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
