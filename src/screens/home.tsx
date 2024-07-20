import TableSkeleton from "@/components/skeleton/table-skeleton";
import TableUser from "@/components/table-user/table-user";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useRequest";
import { IFilters } from "@/interfaces/table";
import { IInfo, IUser } from "@/interfaces/user";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [{ loading, success, data, error }, fetchUser] = useFetch<{
    info: IInfo;
    results: IUser[];
  }>("/api/");
  const [page, setPage] = useState<number>(1);

  const [filters, setFilters] = useState<IFilters>({ nat: "", gender: "" });

  useEffect(() => {
    const params = {
      results: 10,
      page,
      ...(filters.gender && { gender: filters.gender }),
      ...(filters.nat && { nat: filters.nat }),
    };
    fetchUser(params);
  }, [page, filters]);

  const retry=()=>{
    const params = {
        results: 10,
        page,
        ...(filters.gender && { gender: filters.gender }),
        ...(filters.nat && { nat: filters.nat }),
      };
      fetchUser(params);
  }

  useEffect(() => {
    if (data) {
      setPage(data.info.page);
    }
  }, [data]);

  if (loading) {
    return <TableSkeleton />;
  }
  if (error) {
    return (
      <div className=" flex items-center  flex-col mt-10 gap-2 justify-center">
        Ops, ocurrió un problema.
        <Button onClick={retry} className="">
            Volver a intentarlo
        </Button>
      </div>
    );
  }
     return (
       <div>
         {data && success && (
           <TableUser
             setFilters={setFilters}
             filters={filters}
             page={page}
             setPage={setPage}
             loading={loading}
             data={data.results.map((e) => ({
               id: e.id.value,
               image: e.picture.thumbnail,
               name: `${e.name.first} ${e.name.last}`,
               gender: e.gender,
               address: e.location.street.name,
               phone: e.cell,
               email: e.email,
               country: e.location.country,
             }))}
           />
         )}
       </div>
     );
};

export default HomeScreen;
