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
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { SearchResult, SearchType, useApi } from "../hooks/useapi";
import {
  gameControllerOutline,
  search,
  tvOutline,
  videocamOutline,
} from "ionicons/icons";
import IonPageComponent from "../components/IonPageComponent";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchMovies } from "../hooks/movies";

const Wrapper = styled.div`
  .searchbar-input {
    background-color: white;
  }
  ion-item {
    --background: white;
  }
  
  ion-list {
    --background: white;
  }
`;

const Home: React.FC = () => {
  // const { searchData } = useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  /* const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert(); */
  const [loading, dismiss] = useIonLoading();
  const [calling, setCalling] = useState(false);

  const {
    isLoading,
    isFetching,
    data: searchData,
  } = useQuery(["movies", searchTerm, type], fetchMovies, {
    enabled: calling,
    keepPreviousData: true,
  });

  /*  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

    const loadData = async () => {
      await loading();
      const result: any = await searchData(searchTerm, type);
      await dismiss();
      if (result?.Error) {
        presentAlert(result.Error);
      } else {
        setResults(searchData);
        // setResults(result.Search);
      }
      console.log("result", result);
    };
    loadData();
  }, [searchTerm, type]); */

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
        {isFetching ? (
          loading
        ) : isLoading ? (
          loading
        ) : (
          <IonList>
            {searchData &&
              searchData?.data?.Search?.map((item: SearchResult) => (
                <IonItem
                  button
                  key={item.imdbID}
                  routerLink={`/movies/${item.imdbID}`}
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
      </Wrapper>
    </IonPageComponent>
  );
};

export default Home;
