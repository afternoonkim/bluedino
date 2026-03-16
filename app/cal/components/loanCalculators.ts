export type LoanRepaymentType = "equal-payment" | "equal-principal";

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function sanitizeNumericString(input: string) {
  return input.replace(/[^0-9]/g, "");
}

export function parseMoney(input: string) {
  const cleaned = sanitizeNumericString(input);
  return cleaned ? Number(cleaned) : 0;
}

export function formatNumber(value: number) {
  return Math.round(value).toLocaleString("ko-KR");
}

export function formatCurrency(value: number) {
  return `${formatNumber(value)}원`;
}

export function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}

export function formatShortKrw(value: number) {
  const abs = Math.abs(value);
  if (abs >= 100000000) return `${(value / 100000000).toFixed(1)}억 원`;
  if (abs >= 10000) return `${(value / 10000).toFixed(0)}만 원`;
  return `${formatNumber(value)}원`;
}

export function monthlyPayment(principal: number, annualRate: number, months: number) {
  if (months <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

export function buildAmortization(params: {
  principal: number;
  annualRate: number;
  months: number;
  repaymentType: LoanRepaymentType;
  extraPayment?: number;
}) {
  const { principal, annualRate, months, repaymentType, extraPayment = 0 } = params;
  const rows: Array<{
    month: number;
    payment: number;
    principalPaid: number;
    interestPaid: number;
    balance: number;
    cumulativeInterest: number;
  }> = [];

  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  let cumulativeInterest = 0;
  const equalPaymentValue = monthlyPayment(principal, annualRate, months);
  const equalPrincipalValue = months > 0 ? principal / months : 0;

  for (let month = 1; month <= months; month += 1) {
    if (balance <= 0) break;

    const interestPaid = balance * monthlyRate;
    let principalPaid = 0;
    let payment = 0;

    if (repaymentType === "equal-payment") {
      payment = equalPaymentValue;
      principalPaid = payment - interestPaid;
    } else {
      principalPaid = equalPrincipalValue;
      payment = principalPaid + interestPaid;
    }

    principalPaid += extraPayment;
    principalPaid = Math.min(principalPaid, balance);
    payment = principalPaid + interestPaid;
    balance = Math.max(0, balance - principalPaid);
    cumulativeInterest += interestPaid;

    rows.push({
      month,
      payment,
      principalPaid,
      interestPaid,
      balance,
      cumulativeInterest,
    });
  }

  return rows;
}
