/** Used enum because value could be easily changed and no one wants to change value of an option in whole project */
enum Delays {
  SHORT_DELAY = 20,
  SHORT_PLUS_DELAY = 50,
  MIDDLE_DELAY = 100,
  MIDDLE_PLUS_DELAY = 140,
  LONG_DELAY = 200,
  LONG_PLUS_DELAY = 350,
  ELONG_DELAY = 2500,
  ELONG_PLUS_DELAY = 7000,

  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  MIDDLE_ACCENT_DELAY = 2500,
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  LONG_ACCENT_DELAY = 7000,
}

export type DelayProps = {
  delay?: Delays;
}

const delayCssVars = {
  '--short-delay-time': `${Delays.SHORT_DELAY}ms`,
  '--short-plus-delay-time': `${Delays.SHORT_PLUS_DELAY}ms`,
  '--middle-delay-time': `${Delays.MIDDLE_DELAY}ms`,
  '--middle-plus-delay-time': `${Delays.MIDDLE_PLUS_DELAY}ms`,
  '--long-delay-time': `${Delays.LONG_DELAY}ms`,
  '--long-plus-delay-time': `${Delays.LONG_PLUS_DELAY}ms`,
  '--elong-delay-time': `${Delays.ELONG_DELAY}ms`,
  '--elong-plus-delay-time': `${Delays.ELONG_PLUS_DELAY}ms`,
  '--middle-accent-delay-time': `${Delays.MIDDLE_ACCENT_DELAY}ms`,
  '--long-accent-delay-time': `${Delays.LONG_ACCENT_DELAY}mss`
}


export { Delays, delayCssVars }