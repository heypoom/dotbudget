/**
  Investments define the percentages in which you'll be investing your money in. (e.g. gold, stocks, bonds)

  @example
  investments:
    Gold: 10%
    Thai Market: 10%
    Cash: 20%
    Dividend Stocks: 20%
    Global Market: 40%
 */
export type Investments = Record<string, number>
