'use client';
import { useCallback, useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, interval = 100) => {
  const intervalId = useRef<NodeJS.Timeout>(undefined)

  const clear = useCallback(() => {
      clearInterval(intervalId.current)
  }, []);

  const restart = useCallback((newInterval: number) => {
    clear();
    intervalId.current = setInterval(callback, newInterval ?? interval)
  }, [callback, clear, interval])

  useEffect(() => {
    console.log('running effect use interval')
    intervalId.current = setInterval(callback, interval)
    return clear
  }, [callback, clear, interval])

  return {
    clear,
    restart,
  }
}