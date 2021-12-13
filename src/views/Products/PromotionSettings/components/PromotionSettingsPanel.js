import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { RightLabelInputGroup, LoadButton, TabsSection, Listing, ErrorMessage } from "components";
import useApi from "utils/api/useApi";
import { useAsyncTask, useRouter } from "utils/tools";
import { useFilter } from "utils/filter";
import { useSnackbar } from "notistack";
import useFormHandler from "utils/forms/useFormHandler";
import { formStructure, fields, messages } from "../promotionSettingsConfig";
import PromotionListItem from "./PromotionListItem";

const tabKeys = ["published", "unpublished"];

const useStyles = makeStyles(theme => ({
  topContainer: {
    padding: theme.spacing(3)
  },
  formContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  listsContainer: {
    marginTop: theme.spacing(3)
  },
  textField: {
    margin: "2px 0px",
    width: "100%",
  },
  submitButton: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
}));

let mounted = false;

const PromotionSettingsPanel = (props) => {
  const { type } = props;
  const classes = useStyles();
  const api = useApi();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [runCreate, load, error] = useAsyncTask("promotion-create"); // eslint-disable-line
  const [activeTab, setActiveTab] = useState("published");
  const [formFields=fields, values, errors, setValues, setErrors, setDirtys] = useFormHandler(formStructure); // eslint-disable-line
  const [filter, updateFilter] = useFilter("promotionGroups");

  useEffect(() => {
    mounted = true;
    updateFilter({ ...filter, type, published: activeTab==="published" ? 1 : 0 });
    return () => mounted = false;
  }, []); // eslint-disable-line

  const handleCreate = (e) => {
    e.preventDefault();
    runCreate(async () => {
      const { type, name, handle, description, discount_type, discount_value, start_at, end_at, published } = values;
      let body = {
        type, name, handle, description, discount_type, discount_value, start_at, end_at, published
      };
      const response = await api.path("group/promotion_group/create").post({ body });
      let model = response?.data?.result?.model;
      if (model) {
        enqueueSnackbar("Promotion Group Successfully Added!", { variant: "success" });
        router.history.push(`/promotion-settings/${model.id}/detail`)
      }
    });
  }

  const handleChange = (event, newValue) => {
    updateFilter({ ...filter, type, published: tabKeys[newValue]==="published" ? 1 : 0, offset: 0 });
    mounted && setActiveTab(tabKeys[newValue]);
  };

  return (
    <Grid>
      <Paper panelPaper={true} className={classes.topContainer}>
        <form onSubmit={handleCreate}>
          <ErrorMessage message={error?.message} map={messages} />
          <Grid className={classes.formContainer}>
            <Grid sm={12} md={8} item={true}>
              <RightLabelInputGroup
                className={classes.textField}
                fields={formFields}
              />
            </Grid>
            <Grid sm={12} md={4} item={true} className={classes.submitButton}>
              <LoadButton
                variant="contained"
                padding={4}
                size="large"
                type="submit"
                color="primary"
              >
                Create Promotion
              </LoadButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Grid>
        <TabsSection
          onChange={handleChange}
          labels={
            ["Published", "Unpublished"]
          }
          panels={[
            <Listing 
              name="promotionGroups"
              path="group/promotion_group/list"
              fields={fields}
              dense
              pageRow
              omitFalsyParams
              itemComponent={PromotionListItem}
              errorMsg="Sorry, we couldn't find any promotion groups. Please add some promotion groups or try searching again."
            />,
            <Listing 
              name="promotionGroups"
              path="group/promotion_group/list"
              fields={fields}
              dense
              pageRow
              omitFalsyParams
              itemComponent={PromotionListItem}
              errorMsg="Sorry, we couldn't find any promotion groups. Please add some promotion groups or try searching again."
            />
          ]}
          panelPaper={true}
          className={classes.listsContainer}
        />
      </Grid>
    </Grid>
  )
}

export default PromotionSettingsPanel;