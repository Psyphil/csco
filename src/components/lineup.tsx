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

export enum Layout {
  Default = "default",
}

export interface ILineup {
  title: string;
  images: (string | { path: string; options?: string })[];
  map: Map | string;
  grenade: Grenade | string;
  movement: Movement | string;
  click: Click | string;
  tick?: Tick | string;
  team?: Team | string;
  tags?: string[];
  source?: string;
  layout?: string;
}

export class Lineup extends React.Component implements ILineup {
  title: string;
  images: { path: string; options?: string }[];
  map: Map;
  grenade: Grenade;
  movement: Movement;
  click: Click;
  tick: Tick;
  team: Team;
  tags: string[];
  source: string;
  layout: string;
  id: string = crypto.randomUUID();

  constructor(props: ILineup) {
    super(props);
    this.title = props.title ?? "";
    this.images = props.images.map((image) => {
      return (
        typeof image === "string"
          ? {
              path: image,
            }
          : image
      ) as { path: string; options?: string };
    });
    //   typeof props.images[0] === "string"
    //     ? props.images.map((image) => ({
    //         path: image,
    //       }))
    //     : (props.images as any[]);
    this.map = props.map.toLowerCase() as Map;
    this.grenade = props.grenade.toLowerCase() as Grenade;
    this.movement = props.movement.toLowerCase() as Movement;
    this.click = props.click.toLowerCase() as Click;
    this.tick = (props.tick ? props.tick.toLowerCase() : Tick.Any) as Tick;
    this.team = (props.team ? props.team.toLowerCase() : Tick.Any) as Team;
    this.tags = props.tags ?? [];
    this.source = props.source ?? "";
    this.layout = props.layout ?? Layout.Default;
  }

  pill = (text?: string) => {
    if (text === undefined) return "";
    return (
      <div className="rounded border border-dark-500 px-1 py-0.5 dark:bg-dark-400 dark:text-light">
        {text}
      </div>
    );
  };

  render() {
    return (
      <article
        key={this.id}
        className="row-height widget inline-flex max-w-[100vw] flex-col text-xs"
      >
        <h2 className="m-1 mb-0 items-center rounded border border-dark p-1 dark:bg-dark-400">
          {this.title}
        </h2>
        <div
          className="relative m-1 flex-grow overflow-hidden rounded border border-dark"
          data-lineup-layout={this.layout}
        >
          {this.images.map((image, index) => {
            return (
              <div
                key={this.id + "-" + index}
                className={`screenshot hover:!clip-none relative max-w-full [height:var(--image-height)] hover:z-10 hover:!scale-300 hover:before:!hidden ${image.options}`}
                style={{ backgroundImage: `url(${image.path})` }}
              >
                {/* <img className='text-image' src='{image.path}' /> */}
              </div>
            );
          })}
          <div className="absolute bottom-0 right-0 m-1 flex gap-1">
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
