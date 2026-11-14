import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Mood } from '../types'

const PANE = 'ascii-menagerie'
const TITLE = 'ASCII Menagerie'

type Animal = {
  name: string
  says: string[]
  color: string
  accent: string
  accentChars: string
  frames: string[]
}

const ANIMALS: Animal[] = [
  { name: 'Cat', color: '#F4A340', accent: '#7BD88F', accentChars: 'o-^', says: ['mrrp', 'purr...', 'feed me'], frames: [
    '  /\\_/\\  \n ( o.o ) \n  > ^ <  \n /     \\ \n(|     |)~',
    '  /\\_/\\  \n ( -.- ) \n  > ^ <  \n /     \\ \n(|     |) ~',
    '  /\\_/\\  \n ( o.o ) \n  > ^ <  \n /     \\ \n(|     |)~~',
  ] },
  { name: 'Bunny', color: '#F7A8C8', accent: '#FF6B9A', accentChars: 'o-"', says: ['hop', 'carrot pls', '*nose wiggle*'], frames: [
    ' (\\(\\   \n ( -.-) \n o_(")(")',
    ' (\\(\\   \n ( o.o) \n o_(")(")',
    ' (\\ /)  \n ( o.o) \n o_(")(")',
  ] },
  { name: 'Owl', color: '#C9A06B', accent: '#FFD166', accentChars: 'O-,', says: ['hoo?', 'whooo', 'night shift'], frames: [
    '  ,_,  \n (O,O) \n (   ) \n -"-"- ',
    '  ,_,  \n (-,O) \n (   ) \n -"-"- ',
    '  ,_,  \n (O,O) \n /)  )\\\n -"-"- ',
  ] },
  { name: 'Fish', color: '#FF9F1C', accent: '#5BC0EB', accentChars: 'o', says: ['blub', 'blub blub', 'o  o'], frames: [
    '      o  \n   o     \n ><(((º> ',
    '    o    \n  o      \n  ><(((º>',
    '   o     \n       o \n ><(((º> ',
  ] },
  { name: 'Penguin', color: '#9CC3E6', accent: '#F7C948', accentChars: 'V^', says: ['noot', 'brr', 'waddle'], frames: [
    '   _~_   \n  (o o)  \n /  V  \\ \n/(  _  )\\\n  ^^ ^^  ',
    '   _~_   \n  (o o)  \n /  V  \\ \n (  _  )\\\n  ^^ ^^  ',
    '   _~_   \n  (o o)  \n /  V  \\ \n/(  _  ) \n  ^^ ^^  ',
  ] },
  { name: 'Snail', color: '#7BC67E', accent: '#C792EA', accentChars: '@()', says: ['...slowly', 'no rush', '@'], frames: [
    '    _____      \n   /     \\  @ @\n  | (@)   |_/ /\n   \\_____/___/ ',
    '    _____      \n   /     \\ @ @ \n  | (@)   |/ /  \n   \\_____/__/   ',
  ] },
  { name: "Dog", color: "#D9A066", accent: "#FF6B6B", accentChars: "o'", says: ["woof!", "ball?", "best day"], frames: [
    "   __           \n o-''|\\_____/)  \n  \\_/|_)     )  \n     \\  __  /   \n     (_/ (_/    ",
    "   __           \n o-''|\\_____/)  \n  \\_/|_)     )  \n     \\  __  /\\  \n     (_/ (_/    ",
  ] },
  { name: "Frog", color: "#6BCB77", accent: "#FFD93D", accentChars: "@", says: ["ribbit", "croak", "*catches fly*"], frames: [
    "  @..@  \n (----) \n( >__< )\n^^ ~~ ^^",
    "  -..@  \n (----) \n( >__< )\n^^ ~~ ^^",
    "  @..@  \n (----) \n( >__< )\n ^^  ^^ ",
  ] },
  { name: "Turtle", color: "#4CAF8F", accent: "#F4D35E", accentChars: "o", says: ["slow and steady", "*hides*", "hello"], frames: [
    "   _____     ____ \n  /      \\  |  o |\n |        |/ ___\\|\n |_________/      \n |_|_| |_|_|      ",
    "   _____     ____ \n  /      \\  |  o |\n |        |/ ___\\|\n |_________/      \n  |_|_| |_|_|     ",
  ] },
  { name: "Mouse", color: "#B8B8C8", accent: "#FF8FAB", accentChars: "o~", says: ["squeak", "cheese?", "*twitch*"], frames: [
    "  (\\_/)    \n  (o.o)    \n o( _ )~~  \n   \" \"     ",
    "  (\\_/)    \n  (-.-)    \n o( _ ) ~~ \n   \" \"     ",
    "  (\\_/)    \n  (o.o)    \n o( _ )~ ~ \n   \" \"     ",
  ] },
  { name: "Bear", color: "#C08A5B", accent: "#FFCF99", accentChars: "o-", says: ["grr (friendly)", "honey?", "*big hug*"], frames: [
    " .--.  .--. \n/    \\/    \\\n| .-.  .-. |\n|  o    o  |\n \\   __   / \n  '-.__.-'  ",
    " .--.  .--. \n/    \\/    \\\n| .-.  .-. |\n|  -    -  |\n \\   __   / \n  '-.__.-'  ",
  ] },
  { name: "Bat", color: "#A78BFA", accent: "#FFD166", accentChars: "o.", says: ["eek", "squeak", "upside down"], frames: [
    " /\\                 /\\ \n/ \\'._   (\\_/)   _.'/ \\\n|.''._'--(o.o)--'_.''.|\n \\_ / `;=/ \" \\=;` \\ _/ \n   \\__|  \\___/  |__/   ",
    "                       \n  _.-._  (\\_/)  _.-._  \n '_    '-(o.o)-'    _' \n   '-.  /\" \" \\  .-'    \n      '-\\___/-'        ",
  ] },
]

const frame = atom({ plugin: 'ascii-menagerie', key: 'frame' } as const, 0)
const animal = atom({ plugin: 'ascii-menagerie', key: 'animal' } as const, 0)
const mood = atom({ plugin: 'ascii-menagerie', key: 'mood' } as const, null as Mood | null)

const HEART = '#FF6B9A'

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

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'menagerie', description: 'Also show the ASCII Menagerie in a side pane' })
    $.clock.every(600, () => {
      void update($, frame, n => (n + 1) % 1000)
    })
    return next(e)
  })

  on('command.run', { command: 'menagerie' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE })
    return { text: 'ASCII Menagerie opened.' }
  })

  on('prompt.submit', async ($, e, next) => {
    void say($, 'ooh, a new task!').catch(() => undefined)
    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    void say($, `watching ${e.tool}...`, 2500).catch(() => undefined)
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    void say($, 'all done! pet me?', 5000).catch(() => undefined)
    return next(e)
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const i = await read($, animal)
    const n = await read($, frame)
    const m = await read($, mood)
    const a = ANIMALS[i % ANIMALS.length] ?? ANIMALS[0]!
    const art = a.frames[n % a.frames.length] ?? ''
    const line = m && m.until > Date.now() ? m.text : ''

    return (
      <Box flexDirection="column" gap={1}>
        <Text weight="bold" color={a.color}>{a.name}</Text>
        <Box flexDirection="column">
          {art.split('\n').map(l => (
            <Text mono color={a.color}>
              {runs(l, a).map(r => (r.isAccent ? <Text color={a.accent}>{r.text}</Text> : r.text))}
            </Text>
          ))}
        </Box>
        <Text color={line.includes('♥') ? HEART : a.accent}>{line ? `"${line}"` : ' '}</Text>
        <Box flexDirection="row" gap={1}>
          <Button key="pet" label="Pet" onPress={() => say($, `${pick(a.says)} ♥`)} />
          <Button
            key="next"
            label="Next animal"
            onPress={() => update($, animal, v => (v + 1) % ANIMALS.length)}
          />
        </Box>
      </Box>
    )
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const { Box, Text, Button } = $.ui.resolve(e)
    const i = await read($, animal)
    const n = await read($, frame)
    const m = await read($, mood)
    const a = ANIMALS[i % ANIMALS.length] ?? ANIMALS[0]!
    const art = a.frames[n % a.frames.length] ?? ''
    const line = m && m.until > Date.now() ? m.text : ''

    return (
      <Box flexDirection="row" gap={2} alignItems="center">
        <Box flexDirection="column">
          {art.split('\n').map(l => (
            <Text mono color={a.color}>
              {runs(l, a).map(r => (r.isAccent ? <Text color={a.accent}>{r.text}</Text> : r.text))}
            </Text>
          ))}
        </Box>
        <Box flexDirection="column" gap={1}>
          <Text weight="bold" color={a.color}>{a.name}</Text>
          <Text color={line.includes('♥') ? HEART : a.accent}>{line ? `"${line}"` : ' '}</Text>
          <Box flexDirection="row" gap={1}>
            <Button key="band-pet" label="Pet" onPress={() => say($, `${pick(a.says)} ♥`)} />
            <Button
              key="band-next"
              label="Next animal"
              onPress={() => update($, animal, v => (v + 1) % ANIMALS.length)}
            />
          </Box>
        </Box>
      </Box>
    )
  })
}
