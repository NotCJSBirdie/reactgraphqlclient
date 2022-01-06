import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query Query {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query Movies {
    movies {
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const QUERY_SINGLE_MOVIE = gql`
  query Query($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation Mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      age
      username
      nationality
      id
    }
  }
`;

const DisplayData = () => {
  const [movieSearch, setMovieSearch] = useState("");

  // Create User States

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");

  //hooks below

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);

  const { data: moviedata } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(QUERY_SINGLE_MOVIE);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  //hooks above

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="enter name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="enter age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter nationality"
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name: name,
                  age: Number(age),
                  username: username,
                  nationality: nationality,
                },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>

      <div>
        {data &&
          data.users.map((user) => {
            return (
              <div>
                <h1>ID: {user.id}</h1>
                <h1>Name: {user.name}</h1>
                <h1>Age: {user.age}</h1>
                <h1>Username: {user.username}</h1>
                <h1>Nationality: {user.nationality}</h1>
              </div>
            );
          })}
      </div>

      <div>
        {moviedata &&
          moviedata.movies.map((movie) => {
            return (
              <div>
                <h1>Name: {movie.name}</h1>
                <h1>Year of Publication: {movie.yearOfPublication}</h1>
                <h1>Is in Theaters: {movie.isInTheaters}</h1>
              </div>
            );
          })}
      </div>

      <div>
        <input
          placeholder="Search for the movie"
          type="text"
          onChange={(event) => {
            setMovieSearch(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearch,
              },
            });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>Movie Name: {movieSearchData.movie.name}</h1>
              <h1>
                Year of Publication: {movieSearchData.movie.yearOfPublication}
              </h1>
              <h1>Is in Theaters: {movieSearchData.movie.isInTheaters}</h1>
            </div>
          )}
          {movieError && <h1>There was an error fetching the movie</h1>}
        </div>
      </div>
    </div>
  );
};

// Why we are using .users its because the data is a field and inside the data is an array called users. So we have to chain it using data.users.map(). We use the map method only when we declare the users array inside of the data field.

export default DisplayData;
