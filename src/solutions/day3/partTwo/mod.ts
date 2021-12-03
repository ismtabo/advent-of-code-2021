export function filterReportByBit(
  report: string,
  expected: "0" | "1",
  bit: number,
) {
  return report.at(bit) === expected;
}

export function filterReportsBitPredicate(
  reports: string[],
  bit: number,
  predicate: (zeros: number, ones: number) => "0" | "1",
) {
  const { zeros, ones } = reports.reduce(
    ({ zeros, ones }, report) =>
      report.at(bit) === "0"
        ? { zeros: zeros + 1, ones }
        : { zeros, ones: ones + 1 },
    { zeros: 0, ones: 0 },
  );
  const expectedBit = predicate(zeros, ones);
  return reports.filter((report) =>
    filterReportByBit(report, expectedBit, bit)
  );
}

export function reduceReportsByBitPredicate(
  reports: string[],
  predicate: (zeros: number, ones: number) => "0" | "1",
) {
  let bit = 0;
  do {
    reports = filterReportsBitPredicate(reports, bit, predicate);
    bit++;
  } while (reports.length > 1);
  return reports;
}

export function selectOxygen(reports: string[]) {
  const mostCommonBit = (zeros: number, ones: number) =>
    zeros > ones ? "0" : "1";
  return reduceReportsByBitPredicate(reports, mostCommonBit).at(0)!;
}

export function selectCO2(reports: string[]) {
  const leastCommonBit = (zeros: number, ones: number) =>
    zeros <= ones ? "0" : "1";
  return reduceReportsByBitPredicate(reports, leastCommonBit).at(0)!;
}

export function partTwo(reports: string[]) {
  const oxygen = parseInt(selectOxygen(reports), 2);
  const carbon = parseInt(selectCO2(reports), 2);
  return oxygen * carbon;
}
