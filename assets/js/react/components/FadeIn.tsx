import * as React from "react"
import { MotionProps, motion, useReducedMotion } from "framer-motion"

const FadeInStaggerContext = React.createContext(false)

export function FadeIn({ ...props }) {
  let shouldReduceMotion = useReducedMotion()
  let isInStaggerGroup = React.useContext(FadeInStaggerContext)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: {
              once: true,
              margin: "0px 0px -200px",
            },
          })}
      {...props}
    />
  )
}

export type FadeInStaggerProps = {
  faster?: boolean
  className?: string
} & MotionProps

export const FadeInStagger = React.forwardRef(function FadeInStagger(
  props: FadeInStaggerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { faster = false, ...other } = props

  // Consider dropping framer-motion:
  // https://github.com/framer/motion/issues/776
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "0px 0px -200px",
        }}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...other}
      />
    </FadeInStaggerContext.Provider>
  )
})
