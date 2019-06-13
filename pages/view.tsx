import { PageWrapper } from "../layouts";
import { TIERS } from "../components/Tierlist/Tierlist";
import { endpoints, get } from "../shared/http";
import { InitialProps, SaveLookupResponse } from "../shared/types";
import { Tier, Notification, ViewNavbar } from "../components/Tierlist";
import * as React from "react";
import { useDragLayer } from "react-dnd";
import { createDnDContext } from "../shared/helpers";
import tierCss from "../components/Tierlist/style.scss";
import { Typography } from "@material-ui/core";

const View = ({
  name,
  anime,
  characters,
  animeId,
  url
}: SaveLookupResponse) => {
  useDragLayer(() => ({}));
  return (
    <PageWrapper
      title={`${name}'s Tierlist | ${anime.title}`}
      description={`${name}'s tierlist for ${anime.title}!`}
      image={anime.picture}
      url={`https://waifu.hifumi.io${endpoints.lookupSave(url)}`}
    >
      <div className={tierCss.container}>
        <ViewNavbar animeId={animeId} title={anime.title} />
        <div className={tierCss.scroller}>
          <Notification>
            <Typography component="h3">
              You are viewing{" "}
              <span className={tierCss.thin} style={{ lineBreak: "break-all" }}>
              {name || "An anonymous user's"}
            </span>
              's tierlist
            </Typography>
          </Notification>
        {TIERS.map(tier => {
          const tierChars = characters[tier];
          return (
            <Tier
              draggable={false}
              characters={tierChars}
              name={tier}
              key={tier}
              total={tierChars.length}
              update={() => {}}
            />
          );
        })}
        </div>
      </div>
    </PageWrapper>
  );
};

View.getInitialProps = async ({ query }: InitialProps) => {
  const { id } = query;
  return get(endpoints.lookupSave(id));
};

export default createDnDContext(View);
