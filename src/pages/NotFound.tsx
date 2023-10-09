import { Helmet } from "react-helmet";

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <h1>404 page</h1>
    </>
  );
};

export default NotFound;
