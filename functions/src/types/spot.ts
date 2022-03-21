export type Quality = {
    date: string,
    water: boolean,
    plastic: boolean,
    seal: boolean,
  }

export type Vote = {
    date: string,
    quality: Quality
  }

export type Spot = {
    id: string,
    name: string,
    coords: Array<number>,
    quality: Quality,
    status: boolean,
    votes: Array<Vote>,
  }
