import { DatePicker } from 'antd';
import styled from 'styled-components';

interface ContainerProps { }
const Wrapper = styled.div`
  margin: 1rem;
  img {
    margin-top: 1rem;
  }
`
const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <Wrapper>
      <DatePicker />
      <br />
      <img className="m-5" src="/assets/shapes.svg" width="500" height="500" alt="Shapes" />
    </Wrapper>
  );
};

export default ExploreContainer;
