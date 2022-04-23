import {duration} from '../helpers/time';
import {toWei, toBN} from '../helpers/utils';

export const TICKET_METADATA = 'ipfs://bafybeictiwdqz34nagyxhs75sexuzdrkl7hihdc6f3ka7fkebfpwkqimdi/'; // replace with correct meta uri

export const FIRST_YEAR_REWARD = 25_000_000;

const SECONDS_IN_A_DAY = duration.days(1, 's');
const SECONDS_IN_A_MONTH = duration.days(31, 's');
const SECONDS_IN_A_YEAR = duration.years(1, 's');

export const periodsRewardsPerSecond = [
  toBN(toWei(FIRST_YEAR_REWARD)).div(toBN(SECONDS_IN_A_YEAR))
].map(r => r.toString());
export const endTs = Math.floor(Date.now() / 1000) + SECONDS_IN_A_YEAR;
export const periodsStartTs = [Math.floor(Date.now() / 1000)];

export const ticketsMintingRatio = toWei(150_000);
export const ticketsMintingChillPeriod = SECONDS_IN_A_DAY;

export const lockPeriods = [
  0,
  0,
  0,
  0
];
export const lockPeriodMultipliers = [
  100,
  100,
  100,
  100
];

export type DeployParams = {
  token: string;
  endTs?: number;
  ticketsMintingRatio?: string;
  ticketsMintingChillPeriod?: number;
  periodStartTs?: number[];
  periodsRewardsPerSecond?: string[];
  rewardVault: string;
  lockPeriods?: number[];
  lockPeriodMultipliers?: number[];
} 
export const getParams = async (params: DeployParams) => ({
  ticketsMintingRatio,
  ticketsMintingChillPeriod,
  lockPeriods,
  lockPeriodMultipliers,
  periodsStartTs,
  periodsRewardsPerSecond,
  endTs,
    ...params
})