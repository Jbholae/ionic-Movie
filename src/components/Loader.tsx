import { IonSpinner } from "@ionic/react";
import styled from "styled-components";

interface ILoaderProps {
  isLoading: boolean;
  className?: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Loader: React.FC<ILoaderProps> = ({ children, isLoading, className }) => {
  return isLoading ? (
    <Wrapper className={className}>
      <IonSpinner name="circles" />
    </Wrapper>
  ) : (
    <>{children}</>
  );
};

export { Loader };
