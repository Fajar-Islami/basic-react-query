import React from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

// API = https://swapi.dev/documentation

const fetchPlanets = async () => {
  return await (await fetch("http://swapi.dev/api/planets")).json();
};

const Planets = () => {
  /* useQuery(key,async function to data)
  setelah fetch data diawal, untuk selanjutnya akan di cache ketika dipanggil
  */
  const { data, isLoading, isError, isSuccess } = useQuery(
    "planets",
    fetchPlanets
  );
  console.log(data);
  return (
    <div>
      <h2>Planets</h2>
      {/* <p> {status} </p> */}

      {isLoading && <div>Loading data ...</div>}
      {isError && <div>Error fetching data</div>}
      {isSuccess && (
        <div>
          {data.results.map((planet, i) => (
            <Planet planet={planet} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
