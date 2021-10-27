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
  // const { data, isLoading, isError, isSuccess } = useQuery(
  //   ["planets", page],
  //   () => fetchPlanets(page),
  //   {
  //     staleTime: 0,
  //     // cacheTime: 10,
  //     onSuccess: () => console.log("Data fetched with no problem"),
  //   }
  // );

  const { data, isError, isSuccess, isFetching, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>Planets</h2>

      {isFetching && <div>Loading data ...</div>}
      {isError && <div>Error fetching data</div>}
      {isSuccess && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page} </span>
          <button
            onClick={() => {
              setPage((old) => (data?.next ? old + 1 : old));
            }}
            disabled={isPreviousData || !data?.next}
          >
            Next page
          </button>
          <div>
            {data.results.map((planet, i) => (
              <Planet planet={planet} key={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
