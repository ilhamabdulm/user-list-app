import React, { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "@/components/molecules/loading";
import { getUserDetail } from "@/services/user";
import { usePageTitleStore } from "@/store/page-title.context";

function UserDetailPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const { handleChangePageTitle } = usePageTitleStore();
  const navigate = useNavigate();

  useEffect(() => {
    handleChangePageTitle("User Detail");
    if (id) {
      _fetchData(id);
    }
  }, [id]);

  const _fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await getUserDetail(id);
      setUser(response.data);
    } catch (err) {
      toast.error(err.error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <article>
      <header className="mb-8">
        <button
          className="flex items-center gap-2 hover:underline"
          onClick={() => navigate("/users")}
        >
          <HiArrowLeft /> Back
        </button>
      </header>
      <div className="space-y-4">
        <img
          alt={user.first_name + " Photo"}
          src={user.avatar}
          className="avatar-large"
        />
        <div>
          <h4 className="font-medium text-lg">
            {user.first_name} {user.last_name}
          </h4>
          <a className="text-sm underline" href={`mailto:${user.email}`}>
            {user.email}
          </a>
        </div>
      </div>
    </article>
  );
}

export default UserDetailPage;
