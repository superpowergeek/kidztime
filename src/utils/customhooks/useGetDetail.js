import { useEffect, useState } from "react";
import useApi from "utils/api/useApi";
import { useAsyncTask } from "utils/tools";
import { useRouter } from "utils/tools";

// const cellFormat = (model, name) => {
//   if (model) {
//     switch (name) {
//       case "products":
//         model.description = model?.product_info?.description || "";
//         break;
//       default:
//         break;
//     }
//     return model;
//   }
// };

// export default (apiPath, name, param) => {
export default (apiPath, name, param, parseModel) => {
  const api = useApi();
  const router = useRouter();
  const [model, setModel] = useState(null);

  const [runDetail, loading, error] = useAsyncTask(`${name}-detail`);
  let body = {};

  const reload = () => {
    let id = router?.match?.params[param];
    if (!id) return;
    body[param] = id;

    runDetail(async () => {
      const response = await api.path(apiPath, body).get();
      const model = parseModel ? parseModel(response?.data?.result?.model, name) : response?.data?.result?.model;
      setModel(model);
    });
  }
  useEffect(() => {
    let id = router?.match?.params[param];
    if (!id) return;
    body[param] = id;

    reload();
  }, [router.match.params]); // eslint-disable-line

  return [model, loading, error, reload];
};