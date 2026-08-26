import { policyFr } from "./policy-fr";
import { policyEn } from "./policy-en";

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type PolicySection = {
  id: string;
  title: string;
  blocks: PolicyBlock[];
};

export type PolicyPart = {
  id: string;
  title: string;
  intro: string;
  backToStart: string;
  sections: PolicySection[];
};

export type PolicyDocument = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  updated: string;
  applicable: string;
  tocLabel: string;
  tocPrivacy: string;
  tocTerms: string;
  privacy: PolicyPart;
  terms: PolicyPart;
};

export function getPolicy(locale: string): PolicyDocument {
  return locale === "en" ? policyEn : policyFr;
}
