import { getAllFinanceRoutes } from "./data";
import { getFinanceEntry } from "./content";
import type { FinanceCategoryKey, FinanceQuestionEntry } from "./types";

function hasEnoughText(value: string | undefined, minLength = 70) {
  return Boolean(value && value.replace(/\s+/g, " ").trim().length >= minLength);
}

export function isIndexableFinanceEntry(entry: FinanceQuestionEntry | null | undefined) {
  if (!entry) return false;
  const hasSections = entry.sections.length >= 2 && entry.sections.every((section) => section.body.join(" ").length >= 80);
  const hasSupport = Boolean(entry.example || entry.commonMistakes.length >= 2);
  const hasLinks = entry.relatedCalculatorLinks.length > 0 || entry.relatedGuideLinks.length > 0;

  return (
    hasEnoughText(entry.summary) &&
    hasEnoughText(entry.quickAnswer) &&
    hasSections &&
    hasSupport &&
    entry.faq.length >= 3 &&
    hasLinks &&
    Boolean(entry.updatedAt)
  );
}

export function getIndexableFinanceRoutes() {
  return getAllFinanceRoutes().filter(({ category, slug }) =>
    isIndexableFinanceEntry(getFinanceEntry(category as FinanceCategoryKey, slug)),
  );
}

export function getIndexableFinanceEntries() {
  return getIndexableFinanceRoutes()
    .map(({ category, slug }) => getFinanceEntry(category as FinanceCategoryKey, slug))
    .filter((entry): entry is FinanceQuestionEntry => Boolean(entry));
}
