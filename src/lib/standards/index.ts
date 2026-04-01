export type {
  Severity,
  Requirement,
  ScoringRule,
  Standard,
  DomainPack,
} from "./types";

export { healthcarePack } from "./healthcare";
export { financePack } from "./finance";
export { devopsPack } from "./devops";
export { realEstatePack } from "./real-estate";
export { legalPack } from "./legal";

import { healthcarePack } from "./healthcare";
import { financePack } from "./finance";
import { devopsPack } from "./devops";
import { realEstatePack } from "./real-estate";
import { legalPack } from "./legal";
import type { DomainPack, Standard } from "./types";

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

const domainPacks: DomainPack[] = [
  healthcarePack,
  financePack,
  devopsPack,
  realEstatePack,
  legalPack,
];

/* ------------------------------------------------------------------ */
/*  Query helpers                                                      */
/* ------------------------------------------------------------------ */

/** Return every domain pack. */
export function getAllDomainPacks(): DomainPack[] {
  return domainPacks;
}

/** Return a flat list of every standard across all domains. */
export function getAllStandards(): Standard[] {
  return domainPacks.flatMap((p) => p.standards);
}

/** Return all standards belonging to the given domain key. */
export function getStandardsByDomain(domain: string): Standard[] {
  const pack = domainPacks.find((p) => p.domain === domain);
  return pack ? pack.standards : [];
}

/** Return a single standard by its unique ID, or `undefined`. */
export function getStandard(id: string): Standard | undefined {
  return getAllStandards().find((s) => s.id === id);
}
