import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Listing, SectionPaper } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "store";
import { AddWebpageElements, WebpageElement } from "./components";
import { fields } from "./webpageElementsConfig";

const WebpageElements = (props) => {
  const { model, className } = props;
  const [edit, setEdit] = useState(false);
  const name = "pageElements"
  const dispatch = useDispatch();
  const filter = useSelector(state => state.Filter[name]);

  useEffect(() => {
    dispatch(Actions.Filter.update({ key: name, value: { ...filter, webpage: model.id } }));
  }, []); // eslint-disable-line

  return (
    <SectionPaper className={className}
      title="Webpage Elements"
      button={
        <IconButton onClick={() => setEdit(true)}>
          <AddIcon />
        </IconButton>
      }
    >
      <Listing
        name={name}
        path="frontend/webpage/element/list"
        fields={fields}
        dense
        pageRow
        omitFalsyParams
        itemComponent={WebpageElement}
        errorMsg="Sorry, we couldn't find any customised pages. Please add some customised pages or try searching again."
      />
      <AddWebpageElements
        open={edit}
        handleClose={() => setEdit(false)}
        model={model}
      />
    </SectionPaper>
  );
};

export default WebpageElements;
