import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

// API = https://swapi.dev/documentation

const fetchPlanets = async (page) => {
  return await (
    await fetch(`http://swapi.dev/api/planets/?page=${page}`)
  ).json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  /* useQuery([key,param],async function to data,config)
  setelah fetch data diawal, untuk selanjutnya akan di cache ketika dipanggil
  */
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      staleTime: 0,
      // cacheTime: 10,
      onSuccess: () => console.log("Data fetched with no problem"),
    }
  );

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}> Page 1</button>
      <button onClick={() => setPage(2)}> Page 2</button>
      <button onClick={() => setPage(3)}> Page 3</button>

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
