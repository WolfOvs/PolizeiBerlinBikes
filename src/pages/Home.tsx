import { BASE_URL } from "@services/api/api.config";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import SearchInput from "@components/search/inputSearch";
import TableMap from "@components/tableMap/tableMap";
import { useLocation, useNavigate } from "react-router-dom";

interface BikeSearch {
  title: string;
}

function Home() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filterBikes, setFilterBikes] = useState("");
  const location = useLocation();

  if (location.state === null) {
    navigate("/");
  }

  const fetchCountBikes = () =>
    fetch(`${BASE_URL}/bikesCount`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${location.state.token}`,
      }),
    }).then((res) => res.json());

  const fetchBikes = (page = 1) =>
    fetch(`${BASE_URL}/bikes`, {
      method: "POST",
      body: JSON.stringify({ page: page }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${location.state.token}`,
      },
    }).then((res) => res.json());

  const { data: dataCount } = useQuery({
    queryKey: ["bikesCount"],
    queryFn: () => fetchCountBikes(),
    keepPreviousData: true,
  });

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["bikes", page],
    queryFn: () => fetchBikes(page),
    keepPreviousData: true,
  });

  const onSearch = useCallback(
    (searchTerm: string) => {
      const filteredData = data.bikes.filter((bike: BikeSearch) =>
        bike.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterBikes(filteredData);
    },
    [data]
  );

  return (
    <div className="grid gap-8 text-center">
      <h1 className="text-4xl font-semibold tracking-widest lg:text-7xl">
        Polizei Berlin
      </h1>

      {isLoading ? <span>Loading...</span> : null}
      {data && dataCount && (
        <>
          <div className="flex w-100 justify-between">
            <div className="flex justify-start">
              <SearchInput onSearch={onSearch} />
              <button
                onClick={() => setFilterBikes("")}
                className="button-primary"
              >
                Reset
              </button>
            </div>
            <div className="flex justify-end">
              <button
                className="button-primary mr-2"
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 1}
              >
                Previous Page
              </button>
              <span>
                Current Page: {page} of {Math.round(dataCount.proximity / 10)},
                total: {dataCount.proximity}
              </span>
              <button
                className="ml-2 button-primary"
                onClick={() => {
                  setPage((old) => old + 1);
                }}
                disabled={page * 10 > dataCount.proximity}
              >
                Next Page
              </button>
            </div>
          </div>
          <TableMap dataBikes={filterBikes ? filterBikes : data?.bikes} />
        </>
      )}
    </div>
  );
}

export default Home;
