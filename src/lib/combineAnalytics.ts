type BranchAnalytics = {
  branchId: string;
  branchName: string;
  revenue: { value: number; previous: number, change: number };
  subscriptions: { value: number; previous: number, change: number };
  sales: { value: number; previous: number, change: number };
};

type CombinedAnalytics = {
  revenue: { value: number; previous: number, change: number };
  subscriptions: { value: number; previous: number, change: number };
  sales: { value: number; previous: number, change: number };
};

export function combineBranchAnalytics(data: BranchAnalytics[]): CombinedAnalytics {
  let totalRevenueCurrent = 0;
  let totalRevenueLast = 0;

  let totalSubsCurrent = 0;
  let totalSubsLast = 0;

  let totalSalesCurrent = 0;
  let totalSalesLast = 0;

  for (const branch of data) {
    const revChange = branch.revenue.change;
    const subsChange = branch.subscriptions.change;
    const salesChange = branch.sales.change;

    const revPrev = estimatePrevious(branch.revenue.value, revChange);
    const subsPrev = estimatePrevious(branch.subscriptions.value, subsChange);
    const salesPrev = estimatePrevious(branch.sales.value, salesChange);

    totalRevenueCurrent += branch.revenue.value;
    totalRevenueLast += revPrev;

    totalSubsCurrent += branch.subscriptions.value;
    totalSubsLast += subsPrev;

    totalSalesCurrent += branch.sales.value;
    totalSalesLast += salesPrev;
  }

  return {
    revenue: {
      value: totalRevenueCurrent,
      previous: totalRevenueLast,
      change: calculateChange(totalRevenueCurrent, totalRevenueLast),
    },
    subscriptions: {
      value: totalSubsCurrent,
      previous: totalSubsLast,
      change: calculateChange(totalSubsCurrent, totalSubsLast),
    },
    sales: {
      value: totalSalesCurrent,
      previous: totalSalesLast,
      change: calculateChange(totalSalesCurrent, totalSalesLast),
    },
  };
}

function estimatePrevious(current: number, change: number): number {
  if (change === 100) return 0;
  return current / (1 + change / 100);
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}
