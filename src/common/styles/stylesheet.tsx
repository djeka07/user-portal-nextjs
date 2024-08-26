'use client';

import createTheme from './'
import { createStyleSheet } from "@djeka07/ui";
import Head from "next/head";
import { useMemo } from "react";
import { useColorMode } from "~/common/models/hooks";


const StylesSheet = () => {
  const [{ mode }] = useColorMode();
  const theme = useMemo(() => createTheme(mode), [mode])
  return (
    <>
      {createStyleSheet(theme)}
    </>
  )
}

export default StylesSheet;