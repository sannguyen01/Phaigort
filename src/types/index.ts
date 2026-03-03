export interface Gemstone {
  id: string;
  name: string;
  origin: string;
  formationStory: string;
  traceElements: string[];
  weight: number;
  dimensions: string;
  imageUrl: string;
}

export interface Artifact {
  id: string;
  name: string;
  period: string;
  culture: string;
  provenance: string;
  materials: string[];
  description: string;
  imageUrl: string;
}

export interface Collection {
  id: string;
  title: string;
  domain: "geological-rarities" | "precious-metals" | "historical-artifacts" | "contemporary-innovations";
  description: string;
  items: Array<Gemstone | Artifact>;
}

export interface NavLink {
  label: string;
  href: string;
}
