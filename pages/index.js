import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { images } from "../next-config";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

import { FavoriteCards } from "../src/components/FavoritesCards";



function Homepage() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header> </Header>
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}> Timeline</Timeline>
                <Footer />
            </div>
        </>

    )
};

export default Homepage

const StyledHeader = styled.div`
    .banner {
        width: 100%;
        height: 230px;
        object-fit: cover;
    }

    .avatars {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

function Header() {
    return (
        <StyledHeader>
            <section className="banner">
                <img className="banner" src="https://live.staticflickr.com/5736/23530949932_7eb693a579_h.jpg" />
            </section>
            <section className="user-info">
                <img className="avatars" src={`https://github.com/${config.github}.png`} />
                {/* tentar resolver json para foto do gitub o codigo: <img src= {`https://github.com/${config.github}.png`} />*/}
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>

    )
};
function Timeline({ searchValue, ...props }) {

    const PlayListsNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {PlayListsNames.map((PlayListsNames) => {
                const videos = props.playlists[PlayListsNames]
                return (
                    <section>
                        <h2>{PlayListsNames}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
};

const StyledFooter = styled.div`
  padding: 16px 32px;
`;

function Footer() {
    return (
        <StyledFooter>
            <h3>Favoritos</h3>
            <FavoriteCards />
        </StyledFooter>

    )
};


