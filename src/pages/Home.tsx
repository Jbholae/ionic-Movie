import {
  IonAvatar,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { SearchResult, SearchType } from "../hooks/useapi";
import {
  gameControllerOutline,
  tvOutline,
  videocamOutline,
} from "ionicons/icons";
import IonPageComponent from "../components/IonPageComponent";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchMovies } from "../hooks/movies";
import { Loader } from "../components/Loader";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  .searchbar-input {
    background-color: white;
  }
  ion-item {
    --background: white;
  }
  ion-list {
    --background: white;
    padding: 0px;
  }

  .searchbar-input {
    background: white;
  }

  .sc-ion-searchbar-md-h
    sc-ion-searchbar-md-s
    md
    searchbar-left-aligned
    searchbar-should-show-clear {
    background: white;
  }

  .empty-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 76vh;
  }
`;

const Home: React.FC = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [calling, setCalling] = useState(false);

  const {
    isLoading,
    isFetching,
    data: searchData,
  } = useQuery(["movies", searchTerm, type], fetchMovies, {
    enabled: calling,
    keepPreviousData: true,
  });

  return (
    <IonPageComponent>
      <IonHeader style={{ position: "sticky", top: 0 }}>
        <IonToolbar color={"primary"}>
          <IonTitle>Movie Application</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Wrapper>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => {
            setSearchTerm(e.detail.value!);
            setCalling(true);
          }}
        ></IonSearchbar>
        <IonItem>
          <IonLabel>Select Searchtype</IonLabel>
          <IonSelect
            value={type}
            onIonChange={(e) => {
              setType(e.detail.value!);
            }}
          >
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>
        <Loader isLoading={isLoading || isFetching}>
          {searchData?.data?.Search === undefined ? (
            <div className="empty-container">
              Type on search field to search for movies.
            </div>
          ) : (
            <IonList>
              {searchData &&
                searchData?.data?.Search?.map((item: SearchResult) => (
                  <IonItem
                    button
                    key={item.imdbID}
                    onClick={() => history.push(`/movies/${item.imdbID}`)}
                  >
                    <IonAvatar slot="start">
                      <IonImg src={item.Poster} />
                    </IonAvatar>
                    <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>
                    {item.Type === "movie" && (
                      <IonIcon slot="end" icon={videocamOutline} />
                    )}
                    {item.Type === "series" && (
                      <IonIcon slot="end" icon={tvOutline} />
                    )}
                    {item.Type === "game" && (
                      <IonIcon slot="end" icon={gameControllerOutline} />
                    )}
                  </IonItem>
                ))}
            </IonList>
          )}
        </Loader>
      </Wrapper>
    </IonPageComponent>
  );
};

export default Home;
