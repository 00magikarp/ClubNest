'use client';

import { motion } from "framer-motion";
import {ReactNode} from "react";

type SlideInTextProps = {
  text: string;
  className: string;
  duration: number;
}

export function SlideInText({ text, className, duration } : SlideInTextProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: -1 }}
      transition={{ duration: duration }}
      className={className}
    >
      {text}
    </motion.h1>
  );
}

type SlideInNodeProps = {
  node: ReactNode;
  duration: number;
}

export function SlideInNode({ node, duration }: SlideInNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: -1 }}
      transition={{ duration: duration }}
    >
      {node}
    </motion.div>
  )
}

type FadeInNodeProps = {
  node: ReactNode;
  duration: number;
}

export function FadeInNode({ node, duration }: FadeInNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration }}
    >
      {node}
    </motion.div>
  )
}