'use client';
import { createContext, useState, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { isWindowAvailable } from '@/helpers/isWindowAvailable';
import { SessionEnum } from '@/localConstants';

interface BatchTransactionsContextType {
  sendBatchTransactionsOnDemand: boolean;
  setSendBatchTransactionsOnDemand: (newState: boolean) => void;
}

const BatchTransactionsContext = createContext<
  BatchTransactionsContextType | undefined
>(undefined);

export const BatchTransactionsContextProvider = ({
  children
}: PropsWithChildren) => {
  const [sendBatchTransactionsOnDemand, setSendBatchTransactionsOnDemand] =
    useState(
      isWindowAvailable()
        ? sessionStorage.getItem(SessionEnum.sendBatchTransactionsOnDemand) ===
            'true'
        : false
    );

  const value: BatchTransactionsContextType = useMemo(
    () => ({
      sendBatchTransactionsOnDemand,
      setSendBatchTransactionsOnDemand
    }),
    [sendBatchTransactionsOnDemand]
  );

  return (
    <BatchTransactionsContext.Provider value={value}>
      {children}
    </BatchTransactionsContext.Provider>
  );
};

export const useBatchTransactionContext = (): BatchTransactionsContextType => {
  const context = useContext(BatchTransactionsContext);

  if (!context) {
    throw new Error(
      'useBatchTransactionContext must be used within a BatchTransactionsContextProvider'
    );
  }

  return context;
};
