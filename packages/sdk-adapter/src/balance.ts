import { getBalance as sdkGetBalance } from 'torosdk';
import { normalizeError } from './errors';

export interface Balances {
  ngnBalance: string;
  usdBalance: string;
  toroGBalance: string;
  kshBalance: string;
}

export const getBalance = async (address: string): Promise<Balances> => {
  try {
    const rawBalance = await sdkGetBalance({ address }) as any;
    return {
      ngnBalance: rawBalance.ngnBalance?.toString() || '0',
      usdBalance: rawBalance.usdBalance?.toString() || '0',
      toroGBalance: rawBalance.toroGBalance?.toString() || '0',
      // bal_ksh is not yet in the compiled torosdk; fall back gracefully
      kshBalance: rawBalance.kshBalance?.toString() || rawBalance.bal_ksh?.toString() || '0',
    };
  } catch (error) {
    throw normalizeError(error, 'getBalance');
  }
};

