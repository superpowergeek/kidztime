import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import { Paths } from "utils/constants";
import { useRouter } from "utils/tools";

const AuthGuard = (props) => {
  const { children } = props;
  const token = useSelector((state) => state.Session.token);
  const lastRoute = useSelector((state) => state.Session.lastRoute);
  const expiresAt = useSelector((state) => state.Session.expires_at);
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    const now = moment();

    if (token && expiresAt.isAfter(now)) {
      let route = lastRoute || Paths.Accounts.List;
      router.history.push(route);
      dispatch(Actions.Session.lastRoute({ lastRoute: null }));
    }
  }, [token, expiresAt]) // eslint-disable-line

  return children;
};

export default AuthGuard;