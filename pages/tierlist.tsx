import * as React from "react";
import { PageWrapper } from "../layouts";
import { endpoints, get } from "../shared/http";
import { Characters } from "jikants/dist/src/interfaces/manga/Characters";
import { Character } from "../shared/types";
import { DragDropContext } from "react-dnd";
import MultiBackend, {
  TouchTransition,
  Preview
} from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/lib/HTML5toTouch";
import Tierlist from "../components/Tierlist/Tierlist";
import TouchBackend from "react-dnd-touch-backend";
import HTML5Backend from "react-dnd-html5-backend";

interface Props {
  readonly characters: Character[];
}

interface InitialProps {
  readonly query: {
    readonly id: string;
  };
}

const TierlistView = ({ characters }: Props) => {
  const generatePreview = (_type: string, item: Character, style: React.CSSProperties) => {
    const additional = { height: "50px" };
    const newStyle = { ...style, ...additional };
    return <div style={newStyle}>
      <img src={item.image_url} style={{ height: "100px" }}/>
    </div>;
  };
  return (
    <PageWrapper>
      <Preview generator={generatePreview} />
      <Tierlist characters={characters} />
    </PageWrapper>
  );
};

TierlistView.getInitialProps = async ({ query }: InitialProps) => {
  const { id } = query;
  const { characters } = (await get(
    endpoints.searchCharacters(id)
  )) as Characters;
  return { characters };

  // test data
  // return {
  //   characters: [
  //     {
  //       mal_id: 129052,
  //       url: "https://myanimelist.net/character/129052/Aoba_Suzukaze",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/7/306601.jpg?s=c90ca367eebe602fdcf8f6b74c9612d8",
  //       name: "Suzukaze, Aoba",
  //       role: "Main",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 129053,
  //       url: "https://myanimelist.net/character/129053/Kou_Yagami",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/11/306602.jpg?s=ca2c28a7ab7e3cdf43fcf14c3feee59f",
  //       name: "Yagami, Kou",
  //       role: "Main",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 129074,
  //       url: "https://myanimelist.net/character/129074/Umiko_Ahagon",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/14/306608.jpg?s=eee8651666177ea0f76ef81b1a88a1ce",
  //       name: "Ahagon, Umiko",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 158824,
  //       url: "https://myanimelist.net/character/158824/Aoba_039_s_Mother",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/questionmark_23.gif?s=f0d17be5a46f7de113f7dbbb23ae5e1a",
  //       name: "Aoba&#039;s Mother",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 129075,
  //       url: "https://myanimelist.net/character/129075/Shizuku_Hazuki",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/3/306609.jpg?s=2031ebaa9142f98bf3c56ef4dbbca032",
  //       name: "Hazuki, Shizuku",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 158403,
  //       url: "https://myanimelist.net/character/158403/Miu_Iijima",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/6/349149.jpg?s=4540f8f26e4746ae7f3d3051635b5557",
  //       name: "Iijima, Miu",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 158747,
  //       url: "https://myanimelist.net/character/158747/Ren_Iijima",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/11/353958.jpg?s=ad81daf3604718816c692fd999b6791c",
  //       name: "Iijima, Ren",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 129073,
  //       url: "https://myanimelist.net/character/129073/Yun_Iijima",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/14/306606.jpg?s=2cc87bfc38146b834d06f08dabe2113e",
  //       name: "Iijima, Yun",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 139286,
  //       url: "https://myanimelist.net/character/139286/Nene_Sakura",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/8/306607.jpg?s=7aa1bfb6bf33633303f036d74bca98a4",
  //       name: "Sakura, Nene",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 129072,
  //       url: "https://myanimelist.net/character/129072/Hajime_Shinoda",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/3/306605.jpg?s=bcc6c7cebde90a55c27489a38515ed06",
  //       name: "Shinoda, Hajime",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 129071,
  //       url: "https://myanimelist.net/character/129071/Hifumi_Takimoto",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/8/306604.jpg?s=bcc3ee34ea92f5070af26921c1853e94",
  //       name: "Takimoto, Hifumi",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 129054,
  //       url: "https://myanimelist.net/character/129054/Rin_Tooyama",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/5/306603.jpg?s=128b3ad354dbab8d1196fc96b0ff04a5",
  //       name: "Tooyama, Rin",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     },
  //     {
  //       mal_id: 158775,
  //       url: "https://myanimelist.net/character/158775/Yamada",
  //       image_url:
  //         "https://cdn.myanimelist.net/images/characters/3/349995.jpg?s=8bf89169c262f6f0eb81686960437cc3",
  //       name: "Yamada",
  //       role: "Supporting",
  //       voice_actors: [[Object], [Object]]
  //     }
  //   ].map(({ voice_actors, ...rest }) => rest)
  // };
};

const config = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend({ enableMouseEvents: true }),
      preview: true,
      transition: TouchTransition,
      skipDispatchOnTransition: false
    }
  ]
};

// @ts-ignore
export default DragDropContext(MultiBackend(config))(TierlistView);
