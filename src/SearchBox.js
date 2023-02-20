import React, { useState } from "react";
import {
  OutlinedInput,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
  const { selecPosition, setSelectPosition } = props;
  const [searchText, setSearchtext] = useState("");
  const [listPlace, setListPlace] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(e) => {
              setSearchtext(e.target.value);
            }}
          />
          {console.log(searchText)}
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              const searchParams = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(searchParams).toString();
              const requestOptions = { method: "GET", redirect: "follow" };
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((res) => res.text())
                .then(
                  (result) => {
                    setListPlace(JSON.parse(result));
                    console.log(JSON.parse(result));
                  },
                  (error) => console.log("err", error)
                );
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <List>
          {listPlace.map((item) => {
            return (
              <div key={item?.osm_id}>
                <ListItemButton
                  onClick={() => {
                    setSelectPosition(item);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="./placeholder.png"
                      alt="Placeholder"
                      style={{ width: 38, height: 38 }}
                    ></img>
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItemButton>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}
