import React from "react";
import onWindowSmoothResize from "../utilities/smooth-resize";
import lineupsProvider, { ILineupFilter } from "../providers/lineupsProvider";
import { Map, Grenade, Team, Tick } from "../components/lineup";
import Header from "../components/header";
import CSCOSelect from "../components/csco-select";
import { Select, Input, Collapse, Dropdown, initTE } from "tw-elements";
import CSCONumberInput from "../components/csco-number-input";
import CSCONavbar from "../components/csco-navbar";
import { IconSettings } from "@tabler/icons-react";
import CSSProperties from "../utilities/css-properties";
import { init_once } from "../utilities";
import CSCODropdown from "../components/csco-dropdown";

export default function Lineups() {
  const mainRef = React.useRef<HTMLElement>(null);
  const [lineups, fetchLineups] = React.useState(lineupsProvider.get());

  const filter = {} as ILineupFilter;
  const routeCSSVariables = {
    "--rows": 2,
    "--image-height": "100%",
  } as CSSProperties;
  const setRows = (value: number) => {
    mainRef.current?.style.setProperty("--rows", value.toString());
    handleResize();
  };
  const getImageHeight = () =>
    mainRef.current?.querySelector("article > div")?.clientHeight + "px";
  const handleResize = () => {
    mainRef.current?.style.setProperty("--image-height", getImageHeight());
  };

  const updateFilter = (prop: keyof ILineupFilter, newValue: any) => {
    filter[prop] = newValue;
    fetchLineups(lineupsProvider.get(filter));
  };

  React.useEffect(() => {
    initTE({ Input, Select, Collapse });
    init_once(() => initTE({ Dropdown }));
    handleResize();
    onWindowSmoothResize(handleResize);
  });

  return (
    <main className="" ref={mainRef} style={routeCSSVariables}>
      <Header className="justify-center">
        <CSCONavbar>
          <CSCOSelect
            label="Maps"
            multiple
            clear
            search
            options={Map}
            onChange={(value: string) => updateFilter("maps", value)}
          />
          <CSCOSelect
            label="Grenades"
            multiple
            clear
            options={Grenade}
            onChange={(value: string) => updateFilter("grenades", value)}
          />
          <CSCOSelect
            label="Team"
            options={Team}
            onChange={(value: string) => updateFilter("teams", value)}
          />
          <CSCODropdown data-sticky anchor={<IconSettings />}>
            <CSCONavbar noCollapse>
              <CSCOSelect
                label="Tickrate"
                options={Tick}
                onChange={(value: string) => updateFilter("ticks", value)}
              />
              <CSCONumberInput
                label="Grid size"
                value={routeCSSVariables["--rows"]}
                onChange={setRows}
                stepSize={0.5}
                minValue={1}
                maxValue={8}
              />
            </CSCONavbar>
          </CSCODropdown>
        </CSCONavbar>
      </Header>
      <div className="p-2 pb-0 flex-grow flex flex-wrap overflow-auto justify-center [align-content:flex-start]">
        {lineups.map((lineup) => lineup.render())}
      </div>
    </main>
  );
}
