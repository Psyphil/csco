import {
  Map,
  Grenade,
  Movement,
  Click,
  Tick,
  Team,
  ILineup,
  Lineup,
} from "../components/lineup";
import { readData, readDataDirectory } from "../utilities/electron";

export interface ILineupFilter {
  title?: string;
  maps?: Map[];
  grenades?: Grenade[];
  movements?: Movement[];
  clicks?: Click[];
  ticks?: Tick;
  teams?: Team;
  tags?: string[];
  sources?: string[];
}

function get(filter?: ILineupFilter): Lineup[] {
  let dataFiles = readDataDirectory().filter(
    (fileName) => fileName === "lineups.json" || fileName.startsWith("lineups-")
  );
  let data = readData(dataFiles);
  if (!(data instanceof Array)) return [];
  let results = new Array<Lineup>();
  applyFilter(data, filter).forEach((item: ILineup) => {
    if (item.images) {
      for (let i = 0; i < item.images.length ?? 0; i++) {
        let image: any = item.images[i];
        let isString = typeof image === "string";
        let path: string = isString ? image : image["path"];
        if (path?.length > 0 && !path.startsWith("http")) {
          path = "image://" + path;
        }
        if (isString) item.images[i] = path;
        else (item.images[i] as any).path = path;
      }
    }
    results.push(new Lineup(item));
  });
  return results;
}

function render(filter?: ILineupFilter): JSX.Element[] {
  return get(filter).map((lineup) => lineup.render());
}

function applyFilter(data: ILineup[], filter?: ILineupFilter): ILineup[] {
  const title = (filter: ILineupFilter, item: ILineup) =>
    !filter.title || item.title.includes(filter.title);

  const maps = (filter: ILineupFilter, item: ILineup) =>
    !filter.maps ||
    filter.maps.length === 0 ||
    filter.maps.includes(item.map.toLowerCase() as Map);

  const grenades = (filter: ILineupFilter, item: ILineup) =>
    !filter.grenades ||
    filter.grenades.length === 0 ||
    filter.grenades.includes(item.grenade.toLowerCase() as Grenade);

  const movements = (filter: ILineupFilter, item: ILineup) =>
    !filter.movements ||
    filter.movements.length === 0 ||
    filter.movements.includes(item.movement.toLowerCase() as Movement);

  const clicks = (filter: ILineupFilter, item: ILineup) =>
    !filter.clicks ||
    filter.clicks.length === 0 ||
    filter.clicks.includes(item.click.toLowerCase() as Click);

  const ticks = (filter: ILineupFilter, item: ILineup) =>
    !filter.ticks ||
    !item.tick ||
    (filter.ticks as string) === Tick.Any ||
    (item.tick as string) === Tick.Any ||
    filter.ticks === ((item.tick ? item.tick.toLowerCase() : "") as Tick);

  const teams = (filter: ILineupFilter, item: ILineup) =>
    !filter.teams ||
    !item.team ||
    (filter.teams as string) === Team.Any ||
    (item.team as string) === Team.Any ||
    filter.teams === ((item.team ? item.team.toLowerCase() : "") as Team);

  const tags = (filter: ILineupFilter, item: ILineup) =>
    !filter.tags ||
    (item.tags &&
      filter.tags.filter((value) => !item.tags?.includes(value)).length === 0);

  const sources = (filter: ILineupFilter, item: ILineup) =>
    !filter.sources || (item.source && filter.sources.includes(item.source));

  return data.filter((item: ILineup) => {
    return (
      !filter ||
      (title(filter, item) &&
        maps(filter, item) &&
        grenades(filter, item) &&
        movements(filter, item) &&
        clicks(filter, item) &&
        ticks(filter, item) &&
        teams(filter, item) &&
        tags(filter, item) &&
        sources(filter, item))
    );
  });
}

const LineupsProvider = { get, render };
export default LineupsProvider;
