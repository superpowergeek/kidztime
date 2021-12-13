import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import useApi from "utils/api/useApi";
import { Paths } from "utils/constants";
import { useAsyncTask, useRouter } from "utils/tools";

const DashboardGuard = (props) => {
  const { children } = props;
  const token = useSelector((state) => state.Session.token);
  const expiresAt = useSelector((state) => state.Session.expires_at);
  const lastRoute = useSelector((state) => state.Session.lastRoute);
  const dispatch = useDispatch();
  const router = useRouter();
  const [runProfile, loading, error] = useAsyncTask("profile"); // eslint-disable-line
  const api = useApi();

  useEffect(() => {
    if (!token) {
      dispatch(Actions.Session.lastRoute({
        lastRoute: router.location.pathname
      }));
      router.history.push(Paths.Auth.Login);
    } else {
      const now = moment();
      if (expiresAt.isBefore(now)) {
        let route = lastRoute || Paths.Accounts.List;
        router.history.push(route);
      } else {
        runProfile(async () => {
          const response = await api.path("account/profile").get();
          const self = response?.data?.result;
          dispatch(Actions.Session.profile({ user: self }));
        })
      }
    }
  }, [token, expiresAt]); // eslint-disable-line

  useEffect(() => {
    if (error) {
      dispatch(Actions.Session.logout());
    }
  }, [error]); // eslint-disable-line

  return children;
};

export default DashboardGuard;