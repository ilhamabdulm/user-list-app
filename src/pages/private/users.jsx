import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/elements/button";
import CardBase from "@/components/elements/card-base";
import Loading from "@/components/molecules/loading";
import { getUsers } from "@/services/user";
import { usePageTitleStore } from "@/store/page-title.context";
import { handleInfiniteScroll } from "@/utils/global";
import { NavLink } from "react-router-dom";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { handleChangePageTitle } = usePageTitleStore();

  useEffect(() => {
    handleChangePageTitle("User List");
    _fetchData(1);

    return () => {
      setUsers([]);
      setTotalPage(1);
      setPage(1);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loading]);

  const handleScroll = useCallback(() => {
    handleInfiniteScroll(true, () => {
      _fetchData(page + 1);
    });
  }, [page]);

  const _fetchData = async (newPage) => {
    try {
      if (newPage <= totalPage) {
        setLoading(true);
        const response = await getUsers({ page: newPage });
        setTotalPage(response.total_pages);
        setUsers((p) => [...p, ...response.data]);
        setPage(newPage);
      }
    } catch (err) {
      toast.error(err.error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <ul className="space-y-4 h-full">
        {users.map((user) => {
          return (
            <li key={user.id}>
              <NavLink to={`/users/${user.id}`}>
                <CardBase className="cursor-pointer hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <img
                      alt={user.first_name + " Photo"}
                      src={user.avatar}
                      className="avatar"
                    />
                    <div>
                      <h4 className="font-medium text-lg">
                        {user.first_name} {user.last_name}
                      </h4>
                      {/* <a
                    className="text-sm underline"
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a> */}
                    </div>
                  </div>
                </CardBase>
              </NavLink>
            </li>
          );
        })}
      </ul>
      {page < totalPage ? (
        <footer className="mt-6 flex justify-center">
          <Button
            size="medium"
            onClick={() => {
              _fetchData(page + 1);
            }}
          >
            Load More
          </Button>
        </footer>
      ) : null}
    </React.Fragment>
  );
}

export default UserListPage;
