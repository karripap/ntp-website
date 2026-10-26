/** A battery asset shown in the portfolio explorer. */
export type PortfolioAsset = {
  /** Stable key, used for tab and panel IDs. */
  id: string;
  /** Asset name. */
  name: string;
  /** Region line above the name. */
  region: string;
  /** Location key from `PORTFOLIO_LOCATIONS` this asset sits at. */
  location: string;
  /** Short description. */
  description: string;
  /** Rated power, in MW. */
  power: number;
  /** Storage capacity, in MWh. */
  capacity: number;
  /** Power conversion equipment. */
  equipment: string;
  /** Reported as in commercial operation. */
  operational: boolean;
  /** Status line. */
  status: string;
  /** Note under the status line. */
  statusNote: string;
};

/** A pin on the portfolio map. */
export type PortfolioLocation = {
  /** Stable key, referenced by `PortfolioAsset.location`. */
  id: string;
  /** Pin label. */
  label: string;
  /** Second line under the label. */
  note?: string;
  /** Horizontal position as a percentage of the map width. */
  x: number;
  /** Vertical position as a percentage of the map height. */
  y: number;
  /** Put the label to the left of the pin. */
  labelLeft?: boolean;
};

const PENDING_NOTE =
  "Reported milestone. Commercial operation was scheduled by 15 August 2026; current COD confirmation pending.";

export const PORTFOLIO_ASSETS: PortfolioAsset[] = [
  {
    id: "bansko1",
    name: "Bansko 1",
    region: "Southwestern Bulgaria",
    location: "bansko",
    description:
      "One of two battery assets near Bansko, bringing storage capacity to southwestern Bulgaria.",
    power: 10,
    capacity: 40,
    equipment: "2 × CRRC CEES e-Station-5000",
    operational: false,
    status: "72-hour tests completed",
    statusNote: PENDING_NOTE,
  },
  {
    id: "bansko2",
    name: "Bansko 2",
    region: "Southwestern Bulgaria",
    location: "bansko",
    description:
      "The second Bansko asset. Together, the two projects provide 20 MW / 80 MWh of nominal capacity.",
    power: 10,
    capacity: 40,
    equipment: "1 × CRRC CEES e-Station-10000",
    operational: false,
    status: "72-hour tests completed",
    statusNote: PENDING_NOTE,
  },
  {
    id: "kableshkovo",
    name: "Kableshkovo",
    region: "Eastern Bulgaria",
    location: "kableshkovo",
    description:
      "The eastern asset, reported as operational and generating revenue in the Bulgarian electricity market.",
    power: 10,
    capacity: 40,
    equipment: "8 × Sineng Electric EH-1250-HB-UD",
    operational: true,
    status: "Commercial operation achieved",
    statusNote:
      "Reported as fully operational. The mandatory 72-hour commissioning tests have also been completed.",
  },
  {
    id: "slivnitsa",
    name: "Slivnitsa",
    region: "Western Bulgaria",
    location: "slivnitsa",
    description:
      "A 10 MW / 40 MWh battery storage project near Slivnitsa, anchoring the western part of the portfolio.",
    power: 10,
    capacity: 40,
    equipment: "2 × CRRC CEES e-Station-5000",
    operational: false,
    status: "72-hour tests completed",
    statusNote: PENDING_NOTE,
  },
];

export const PORTFOLIO_LOCATIONS: PortfolioLocation[] = [
  { id: "bansko", label: "Bansko", note: "02 assets", x: 26, y: 66.2 },
  { id: "slivnitsa", label: "Slivnitsa", x: 19.2, y: 43.8 },
  {
    id: "kableshkovo",
    label: "Kableshkovo",
    x: 80.5,
    y: 48.2,
    labelLeft: true,
  },
];
