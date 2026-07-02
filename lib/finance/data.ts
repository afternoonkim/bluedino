import { isaQuestions } from "@/data/finance/isa";
import { irpQuestions } from "@/data/finance/irp";
import { pensionQuestions } from "@/data/finance/pension";
import { cmaQuestions } from "@/data/finance/cma";
import { parkingQuestions } from "@/data/finance/parking";
import { loanBasicsQuestions } from "@/data/finance/loan-basics";
import { creditLoanQuestions } from "@/data/finance/credit-loan";
import { mortgageLoanQuestions } from "@/data/finance/mortgage-loan";

import type { FinanceCategoryKey, FinanceQuestionItem } from "./types";

export const financeQuestionMap: Record<FinanceCategoryKey, FinanceQuestionItem[]> = {
  isa: isaQuestions,
  irp: irpQuestions,
  pension: pensionQuestions,
  cma: cmaQuestions,
  parking: parkingQuestions,
  "loan-basics": loanBasicsQuestions,
  "credit-loan": creditLoanQuestions,
  "mortgage-loan": mortgageLoanQuestions,
};

export function getQuestionsByCategory(category: FinanceCategoryKey) {
  return financeQuestionMap[category] ?? [];
}

export function getQuestionBySlug(category: FinanceCategoryKey, slug: string) {
  const questions = getQuestionsByCategory(category);
  return questions.find((item) => item.slug === slug);
}

export function getAllFinanceRoutes() {
  const seen = new Set<string>();

  return Object.entries(financeQuestionMap).flatMap(([category, questions]) =>
    questions.flatMap((item) => {
      const routeKey = `${category}/${item.slug}`;
      if (seen.has(routeKey)) return [];

      seen.add(routeKey);
      return [{ category: category as FinanceCategoryKey, slug: item.slug }];
    })
  );
}
