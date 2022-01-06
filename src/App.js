import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./components/DisplayData";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://reactgraphqlbackend.herokuapp.com/graphql",
  });
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <DisplayData />
      </ApolloProvider>
    </div>
  );
}

export default App;
