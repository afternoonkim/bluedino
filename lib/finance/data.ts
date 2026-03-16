
import { irpQuestions } from "@/data/finance/irp";
import { isaQuestions } from "@/data/finance/isa";
import { pensionQuestions } from "@/data/finance/pension";
import { financeCategories } from "./config";
import type { FinanceCategoryKey, FinanceQuestionItem } from "./types";

export const financeQuestionMap: Record<FinanceCategoryKey, FinanceQuestionItem[]> = {
  isa: isaQuestions,
  irp: irpQuestions,
  pension: pensionQuestions,
};

export function getQuestionsByCategory(category: FinanceCategoryKey) {
  return financeQuestionMap[category] ?? [];
}

export function getQuestionBySlug(category: FinanceCategoryKey, slug: string) {
  return getQuestionsByCategory(category).find((item) => item.slug === slug) ?? null;
}

export function getAllFinanceRoutes() {
  return financeCategories.flatMap((category) =>
    getQuestionsByCategory(category.key).map((item) => ({
      category: category.key,
      slug: item.slug,
    })),
  );
}
