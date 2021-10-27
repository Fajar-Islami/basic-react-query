import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

// API = https://swapi.dev/documentation

const fetchPeople = async () => {
  return await (await fetch("http://swapi.dev/api/people")).json();
};

const People = () => {
  /* useQuery(key,async function to data)
  setelah fetch data diawal, untuk selanjutnya akan di cache ketika dipanggil
  */
  const { data, isLoading, isError, isSuccess } = useQuery(
    "people",
    fetchPeople
  );
  console.log(data);
  return (
    <div>
      <h2>People</h2>
      {/* <p> {status} </p> */}

      {isLoading && <div>Loading data ...</div>}
      {isError && <div>Error fetching data</div>}
      {isSuccess && (
        <div>
          {data.results.map((person, i) => (
            <Person person={person} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
