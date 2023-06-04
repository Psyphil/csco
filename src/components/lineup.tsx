import React from "react";
import Enum from "../utilities/enum";

export enum Map {
  Ancient = "ancient",
  Anubis = "anubis",
  Cache = "cache",
  Dust2 = "dust2",
  Inferno = "inferno",
  Mirage = "mirage",
  Nuke = "nuke",
  Overpass = "overpass",
  Train = "train",
  Vertigo = "vertigo",
}

export enum Grenade {
  Flash = "flash",
  HE = "he",
  Molotov = "molotov",
  Smoke = "smoke",
}

export enum Movement {
  Stand = "stand",
  Jump = "jump",
  Run = "run",
  Walk = "walk",
  Crouch = "crouch",
  RunJump = "runjump",
  WalkJump = "walkjump",
  CrouchJump = "crouchjump",
}

export enum Click {
  Left = "left",
  Middle = "middle",
  Right = "right",
}

export enum Tick {
  Any = "",
  T64 = "64",
  T128 = "128",
}

export enum Team {
  Any = "",
  CT = "ct",
  T = "t",
}

export interface ILineup {
  title: string;
  imagePaths: string[];
  map: Map | string;
  grenade: Grenade | string;
  movement: Movement | string;
  click: Click | string;
  tick?: Tick | string;
  team?: Team | string;
  tags?: string[];
  source?: string;
}

export class Lineup extends React.Component implements ILineup {
  title: string;
  imagePaths: string[];
  map: Map;
  grenade: Grenade;
  movement: Movement;
  click: Click;
  tick: Tick;
  team: Team;
  source: string;
  tags: string[];
  id: string = crypto.randomUUID();

  constructor(props: ILineup) {
    super(props);
    this.title = props.title ?? "";
    this.imagePaths = props.imagePaths ?? [""];
    this.map = props.map.toLowerCase() as Map;
    this.grenade = props.grenade.toLowerCase() as Grenade;
    this.movement = props.movement.toLowerCase() as Movement;
    this.click = props.click.toLowerCase() as Click;
    this.tick = (props.tick ? props.tick.toLowerCase() : Tick.Any) as Tick;
    this.team = (props.team ? props.team.toLowerCase() : Tick.Any) as Team;
    this.source = props.source ?? "";
    this.tags = props.tags ?? [];
  }

  pill = (text?: string) => {
    if (text === undefined) return "";
    return (
      <div className="rounded border border-dark-500 dark:bg-dark-400 dark:text-light px-1 py-0.5">
        {text}
      </div>
    );
  };

  render() {
    return (
      <article
        key={this.id}
        className="lineup-article widget text-xs inline-flex flex-col max-w-[100vw]"
      >
        <h2 className="items-center border rounded border-dark dark:bg-dark-400 m-1 mb-0 p-1">
          {this.title}
        </h2>
        <div className="relative flex-grow m-1 rounded overflow-hidden border border-dark">
          {this.imagePaths.map((path, index) => {
            return (
              <div
                key={this.id + "-" + index}
                className="screenshot max-w-full hover:scale-300 [height:var(--image-height)]"
                style={{ backgroundImage: `url(${path})` }}
              >
                {/* <img className='text-image' src='{path}' /> */}
              </div>
            );
          })}
          <div className="absolute right-0 bottom-0 m-1 flex gap-1">
            {this.pill(Enum.key(Grenade, this.grenade))}
            {this.pill(Enum.key(Movement, this.movement))}
            {this.pill(Enum.key(Click, this.click))}
            {Array.isArray(this.tags) &&
              this.tags.map((value: string) => this.pill(value.toLowerCase()))}
          </div>
        </div>
      </article>
    );
  }
}
