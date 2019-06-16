import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import css from "./style.scss"

export const Title = () => {
  return (
    <Typography component="div" className={css.title}>
      <Box
        textAlign="center"
        fontSize={44}
        fontFamily="Roboto"
        fontWeight={600}
        className={css.text}
      >
        Waifu Tierlist
      </Box>
    </Typography>
  );
};

export default Title;
