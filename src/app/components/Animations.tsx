'use client';

import { motion } from "framer-motion";
import {ReactNode} from "react";

type SlideInNodeProps = {
  node: ReactNode;
  duration: number;
  startTime?: number;
}

export function SlideInNode({ node, duration, startTime = 0 }: SlideInNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: -1 }}
      transition={{ duration: duration, delay: Math.max(0, startTime) }}
    >
      {node}
    </motion.div>
  )
}

type FadeInNodeProps = {
  node: ReactNode;
  duration: number;
  startTime?: number;
}

export function FadeInNode({ node, duration, startTime = 0 }: FadeInNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration, delay: Math.max(0, startTime) }}
    >
      {node}
    </motion.div>
  )
}