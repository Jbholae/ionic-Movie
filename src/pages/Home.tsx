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
  tvOutline,
  videocamOutline,
} from "ionicons/icons";
import IonPageComponent from "../components/IonPageComponent";
import styled from "styled-components";

const Wrapper = styled.div`
`;

const Home: React.FC = () => {
  const { searchData } = useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
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
        setResults(result.Search);
      }
      console.log("result", result);
    };
    loadData();
  }, [searchTerm, type]);

  return (
    <IonPageComponent>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Movie Application</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Wrapper>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        ></IonSearchbar>
        <IonItem>
          <IonLabel>Select Searchtype</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value!)}>
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonList>
          {results.map((item: SearchResult) => (
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
      </Wrapper>
    </IonPageComponent>
    /*  <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <ExploreContainer />
    </> */
  );
};

export default Home;
