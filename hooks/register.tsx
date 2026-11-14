import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Act, Mood } from '../types'

const PANE = 'ascii-menagerie'
const TITLE = 'ASCII Menagerie'

type Animal = {
  name: string
  says: string[]
  food: string
  color: string
  accent: string
  accentChars: string
  frames: string[]
}

const ANIMALS: Animal[] = [
  { name: 'Cat', food: "a fish", color: '#F4A340', accent: '#7BD88F', accentChars: 'o-^', says: ['mrrp', 'purr...', 'feed me'], frames: [
    '  /\\_/\\  \n ( o.o ) \n  > ^ <  \n /     \\ \n(|     |)~',
    '  /\\_/\\  \n ( -.- ) \n  > ^ <  \n /     \\ \n(|     |) ~',
    '  /\\_/\\  \n ( o.o ) \n  > ^ <  \n /     \\ \n(|     |)~~',
  ] },
  { name: 'Bunny', food: "a carrot", color: '#F7A8C8', accent: '#FF6B9A', accentChars: 'o-"', says: ['hop', 'carrot pls', '*nose wiggle*'], frames: [
    ' (\\(\\   \n ( -.-) \n o_(")(")',
    ' (\\(\\   \n ( o.o) \n o_(")(")',
    ' (\\ /)  \n ( o.o) \n o_(")(")',
  ] },
  { name: 'Owl', food: "a berry", color: '#C9A06B', accent: '#FFD166', accentChars: 'O-,', says: ['hoo?', 'whooo', 'night shift'], frames: [
    '  ,_,  \n (O,O) \n (   ) \n -"-"- ',
    '  ,_,  \n (-,O) \n (   ) \n -"-"- ',
    '  ,_,  \n (O,O) \n /)  )\\\n -"-"- ',
  ] },
  { name: 'Fish', food: "some flakes", color: '#FF9F1C', accent: '#5BC0EB', accentChars: 'o', says: ['blub', 'blub blub', 'o  o'], frames: [
    '      o  \n   o     \n ><(((º> ',
    '    o    \n  o      \n  ><(((º>',
    '   o     \n       o \n ><(((º> ',
  ] },
  { name: 'Penguin', food: "a sardine", color: '#9CC3E6', accent: '#F7C948', accentChars: 'V^', says: ['noot', 'brr', 'waddle'], frames: [
    '   _~_   \n  (o o)  \n /  V  \\ \n/(  _  )\\\n  ^^ ^^  ',
    '   _~_   \n  (o o)  \n /  V  \\ \n (  _  )\\\n  ^^ ^^  ',
    '   _~_   \n  (o o)  \n /  V  \\ \n/(  _  ) \n  ^^ ^^  ',
  ] },
  { name: 'Snail', food: "a lettuce leaf", color: '#7BC67E', accent: '#C792EA', accentChars: '@()', says: ['...slowly', 'no rush', '@'], frames: [
    '    _____      \n   /     \\  @ @\n  | (@)   |_/ /\n   \\_____/___/ ',
    '    _____      \n   /     \\ @ @ \n  | (@)   |/ /  \n   \\_____/__/   ',
  ] },
  { name: "Dog", food: "a bone", color: "#D9A066", accent: "#FF6B6B", accentChars: "o'", says: ["woof!", "ball?", "best day"], frames: [
    "   __           \n o-''|\\_____/)  \n  \\_/|_)     )  \n     \\  __  /   \n     (_/ (_/    ",
    "   __           \n o-''|\\_____/)  \n  \\_/|_)     )  \n     \\  __  /\\  \n     (_/ (_/    ",
  ] },
  { name: "Frog", food: "a fly", color: "#6BCB77", accent: "#FFD93D", accentChars: "@", says: ["ribbit", "croak", "*catches fly*"], frames: [
    "  @..@  \n (----) \n( >__< )\n^^ ~~ ^^",
    "  -..@  \n (----) \n( >__< )\n^^ ~~ ^^",
    "  @..@  \n (----) \n( >__< )\n ^^  ^^ ",
  ] },
  { name: "Turtle", food: "a strawberry", color: "#4CAF8F", accent: "#F4D35E", accentChars: "o", says: ["slow and steady", "*hides*", "hello"], frames: [
    "   _____     ____ \n  /      \\  |  o |\n |        |/ ___\\|\n |_________/      \n |_|_| |_|_|      ",
    "   _____     ____ \n  /      \\  |  o |\n |        |/ ___\\|\n |_________/      \n  |_|_| |_|_|     ",
  ] },
  { name: "Mouse", food: "some cheese", color: "#B8B8C8", accent: "#FF8FAB", accentChars: "o~", says: ["squeak", "cheese?", "*twitch*"], frames: [
    "  (\\_/)    \n  (o.o)    \n o( _ )~~  \n   \" \"     ",
    "  (\\_/)    \n  (-.-)    \n o( _ ) ~~ \n   \" \"     ",
    "  (\\_/)    \n  (o.o)    \n o( _ )~ ~ \n   \" \"     ",
  ] },
  { name: "Bear", food: "a pot of honey", color: "#C08A5B", accent: "#FFCF99", accentChars: "o-", says: ["grr (friendly)", "honey?", "*big hug*"], frames: [
    " .--.  .--. \n/    \\/    \\\n| .-.  .-. |\n|  o    o  |\n \\   __   / \n  '-.__.-'  ",
    " .--.  .--. \n/    \\/    \\\n| .-.  .-. |\n|  -    -  |\n \\   __   / \n  '-.__.-'  ",
  ] },
  { name: "Bat", food: "a mango", color: "#A78BFA", accent: "#FFD166", accentChars: "o.", says: ["eek", "squeak", "upside down"], frames: [
    " /\\                 /\\ \n/ \\'._   (\\_/)   _.'/ \\\n|.''._'--(o.o)--'_.''.|\n \\_ / `;=/ \" \\=;` \\ _/ \n   \\__|  \\___/  |__/   ",
    "                       \n  _.-._  (\\_/)  _.-._  \n '_    '-(o.o)-'    _' \n   '-.  /\" \" \\  .-'    \n      '-\\___/-'        ",
  ] },
]

const frame = atom({ plugin: 'ascii-menagerie', key: 'frame' } as const, 0)
const animal = atom({ plugin: 'ascii-menagerie', key: 'animal' } as const, 0)
const mood = atom({ plugin: 'ascii-menagerie', key: 'mood' } as const, null as Mood | null)
const act = atom({ plugin: 'ascii-menagerie', key: 'act' } as const, null as Act | null)
const love = atom({ plugin: 'ascii-menagerie', key: 'love' } as const, 3)
const isAsleep = atom({ plugin: 'ascii-menagerie', key: 'isAsleep' } as const, false)

const HEART = '#FF6B9A'
const MAX_LOVE = 5
const EYES = 'oO@'

// Splits a line into runs so the eyes, beak or bubbles get the accent color.
function runs(line: string, a: Animal): { text: string; isAccent: boolean }[] {
  const out: { text: string; isAccent: boolean }[] = []
  for (const ch of line) {
    const isAccent = a.accentChars.includes(ch)
    const last = out[out.length - 1]
    if (last && last.isAccent === isAccent) last.text += ch
    else out.push({ text: ch, isAccent })
  }
  return out
}

const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)] ?? ''

async function say($: EngineInterface, text: string, ms = 3000) {
  const now = await $.clock.now()
  await update($, mood, () => ({ text, until: now + ms }))
}

async function doAct($: EngineInterface, kind: Act['kind'], text: string, gain: number, ms = 3000) {
  const now = await $.clock.now()
  await update($, isAsleep, () => false)
  await update($, act, () => ({ kind, until: now + ms }))
  await update($, love, v => Math.min(MAX_LOVE, v + gain))
  await say($, text, ms)
}

async function pet($: EngineInterface) {
  const a = ANIMALS[(await read($, animal)) % ANIMALS.length] ?? ANIMALS[0]!
  await doAct($, 'pet', `${pick(a.says)} ♥`, 1)
}

async function feed($: EngineInterface) {
  const a = ANIMALS[(await read($, animal)) % ANIMALS.length] ?? ANIMALS[0]!
  await doAct($, 'feed', `*munch munch* thanks for ${a.food}!`, 2, 3500)
}

async function play($: EngineInterface) {
  await doAct($, 'play', pick(['wheee!', 'again! again!', 'catch me!', 'boing boing']), 1, 4000)
}

async function toggleSleep($: EngineInterface) {
  const asleep = await read($, isAsleep)
  await update($, act, () => null)
  await update($, isAsleep, () => !asleep)
  await say($, asleep ? '*yawn* good morning!' : 'good night...', 3000)
}

async function nextAnimal($: EngineInterface, isRandom: boolean) {
  await update($, act, () => null)
  await update($, isAsleep, () => false)
  await update($, animal, v => {
    if (!isRandom) return (v + 1) % ANIMALS.length
    const r = Math.floor(Math.random() * (ANIMALS.length - 1))
    return r >= v ? r + 1 : r
  })
  await say($, 'hi there!', 2000)
}

// The line drawn above the animal: what it is doing right now.
function topLine(kind: Act['kind'] | 'sleep' | null, n: number): string {
  if (kind === 'pet') return n % 2 ? '   ♥   ♥  ' : '  ♥   ♥   '
  if (kind === 'feed') return n % 2 ? '  nom nom ' : '   nom    '
  if (kind === 'play') return n % 2 ? '  * boing *' : ' *  boing  *'
  if (kind === 'sleep') return ['    z     ', '    z Z   ', '    z Z z '][n % 3] ?? ''
  return ' '
}

type View = {
  a: Animal
  lines: string[]
  top: string
  topColor: string
  line: string
  love: number
  asleep: boolean
}

async function view($: EngineInterface): Promise<View> {
  const i = await read($, animal)
  const n = await read($, frame)
  const m = await read($, mood)
  const ac = await read($, act)
  const asleep = await read($, isAsleep)
  const now = Date.now()
  const a = ANIMALS[i % ANIMALS.length] ?? ANIMALS[0]!
  const kind = asleep ? 'sleep' : ac && ac.until > now ? ac.kind : null
  let art = asleep ? (a.frames[0] ?? '') : (a.frames[n % a.frames.length] ?? '')
  if (asleep) art = [...art].map(ch => (EYES.includes(ch) ? '-' : ch)).join('')
  let lines = art.split('\n')
  if (kind === 'play') lines = lines.map(l => (n % 2 ? '  ' + l : l + '  '))
  return {
    a,
    lines,
    top: topLine(kind, n),
    topColor: kind === 'pet' ? HEART : kind === 'sleep' ? '#8FA6C9' : a.accent,
    line: m && m.until > now ? m.text : asleep ? 'zzz...' : '',
    love: await read($, love),
    asleep,
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'menagerie', description: 'Also show the ASCII Menagerie in a side pane' })
    $.clock.every(600, () => {
      void update($, frame, n => (n + 1) % 1000)
    })
    // Love slowly fades unless you keep the animal company.
    $.clock.every(90_000, () => {
      void update($, love, v => Math.max(0, v - 1))
    })
    return next(e)
  })

  on('command.run', { command: 'menagerie' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE })
    return { text: 'ASCII Menagerie opened.' }
  })

  on('prompt.submit', async ($, e, next) => {
    void read($, isAsleep)
      .then(asleep => (asleep ? say($, '*mumbles in sleep*') : say($, 'ooh, a new task!')))
      .catch(() => undefined)
    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    void read($, isAsleep)
      .then(asleep => (asleep ? undefined : say($, `watching ${e.tool}...`, 2500)))
      .catch(() => undefined)
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    void read($, isAsleep)
      .then(asleep => (asleep ? undefined : say($, 'all done! pet me?', 5000)))
      .catch(() => undefined)
    return next(e)
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const v = await view($)
    const hearts = '♥'.repeat(v.love) + '♡'.repeat(MAX_LOVE - v.love)

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="row" gap={1}>
          <Text weight="bold" color={v.a.color}>{v.a.name}</Text>
          <Text color={HEART}>{hearts}</Text>
        </Box>
        <Box flexDirection="column">
          <Text mono color={v.topColor}>{v.top}</Text>
          {v.lines.map(l => (
            <Text mono color={v.a.color}>
              {runs(l, v.a).map(r => (r.isAccent ? <Text color={v.a.accent}>{r.text}</Text> : r.text))}
            </Text>
          ))}
        </Box>
        <Text color={v.line.includes('♥') ? HEART : v.a.accent}>{v.line ? `"${v.line}"` : ' '}</Text>
        <Box flexDirection="row" gap={1} flexWrap="wrap">
          <Button key="pane-pet" label="Pet" onPress={() => pet($)} />
          <Button key="pane-feed" label="Feed" onPress={() => feed($)} />
          <Button key="pane-play" label="Play" onPress={() => play($)} />
          <Button key="pane-sleep" label={v.asleep ? 'Wake up' : 'Sleep'} onPress={() => toggleSleep($)} />
        </Box>
        <Box flexDirection="row" gap={1} flexWrap="wrap">
          <Button key="pane-next" label="Next animal" onPress={() => nextAnimal($, false)} />
          <Button key="pane-random" label="Surprise me" onPress={() => nextAnimal($, true)} />
        </Box>
      </Box>
    )
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const { Box, Text, Button } = $.ui.resolve(e)
    const v = await view($)
    const hearts = '♥'.repeat(v.love) + '♡'.repeat(MAX_LOVE - v.love)

    return (
      <Box flexDirection="row" gap={2} alignItems="center">
        <Box flexDirection="column">
          <Text mono color={v.topColor}>{v.top}</Text>
          {v.lines.map(l => (
            <Text mono color={v.a.color}>
              {runs(l, v.a).map(r => (r.isAccent ? <Text color={v.a.accent}>{r.text}</Text> : r.text))}
            </Text>
          ))}
        </Box>
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="row" gap={1}>
            <Text weight="bold" color={v.a.color}>{v.a.name}</Text>
            <Text color={HEART}>{hearts}</Text>
          </Box>
          <Text color={v.line.includes('♥') ? HEART : v.a.accent}>{v.line ? `"${v.line}"` : ' '}</Text>
          <Box flexDirection="row" gap={1} flexWrap="wrap">
            <Button key="band-pet" label="Pet" onPress={() => pet($)} />
            <Button key="band-feed" label="Feed" onPress={() => feed($)} />
            <Button key="band-play" label="Play" onPress={() => play($)} />
            <Button key="band-sleep" label={v.asleep ? 'Wake up' : 'Sleep'} onPress={() => toggleSleep($)} />
            <Button key="band-next" label="Next" onPress={() => nextAnimal($, false)} />
            <Button key="band-random" label="Surprise me" onPress={() => nextAnimal($, true)} />
          </Box>
        </Box>
      </Box>
    )
  })
}
