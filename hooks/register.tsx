import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Mood } from '../types'

const PANE = 'ascii-menagerie'
const TITLE = 'ASCII Menagerie'

type Animal = { name: string; says: string[]; frames: string[] }

const ANIMALS: Animal[] = [
  { name: 'Cat', says: ['mrrp', 'purr...', 'feed me'], frames: [
    '  /\\_/\\  \n ( o.o ) \n  > ^ <  \n /     \\ \n(|     |)~',
    '  /\\_/\\  \n ( -.- ) \n  > ^ <  \n /     \\ \n(|     |) ~',
    '  /\\_/\\  \n ( o.o ) \n  > ^ <  \n /     \\ \n(|     |)~~',
  ] },
  { name: 'Bunny', says: ['hop', 'carrot pls', '*nose wiggle*'], frames: [
    ' (\\(\\   \n ( -.-) \n o_(")(")',
    ' (\\(\\   \n ( o.o) \n o_(")(")',
    ' (\\ /)  \n ( o.o) \n o_(")(")',
  ] },
  { name: 'Owl', says: ['hoo?', 'whooo', 'night shift'], frames: [
    '  ,_,  \n (O,O) \n (   ) \n -"-"- ',
    '  ,_,  \n (-,O) \n (   ) \n -"-"- ',
    '  ,_,  \n (O,O) \n /)  )\\\n -"-"- ',
  ] },
  { name: 'Fish', says: ['blub', 'blub blub', 'o  o'], frames: [
    '      o  \n   o     \n ><(((º> ',
    '    o    \n  o      \n  ><(((º>',
    '   o     \n       o \n ><(((º> ',
  ] },
  { name: 'Penguin', says: ['noot', 'brr', 'waddle'], frames: [
    '   _~_   \n  (o o)  \n /  V  \\ \n/(  _  )\\\n  ^^ ^^  ',
    '   _~_   \n  (o o)  \n /  V  \\ \n (  _  )\\\n  ^^ ^^  ',
    '   _~_   \n  (o o)  \n /  V  \\ \n/(  _  ) \n  ^^ ^^  ',
  ] },
  { name: 'Snail', says: ['...slowly', 'no rush', '@'], frames: [
    '    _____      \n   /     \\  @ @\n  | (@)   |_/ /\n   \\_____/___/ ',
    '    _____      \n   /     \\ @ @ \n  | (@)   |/ /  \n   \\_____/__/   ',
  ] },
]

const frame = atom({ plugin: 'ascii-menagerie', key: 'frame' } as const, 0)
const animal = atom({ plugin: 'ascii-menagerie', key: 'animal' } as const, 0)
const mood = atom({ plugin: 'ascii-menagerie', key: 'mood' } as const, null as Mood | null)

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
        <Text weight="bold">{a.name}</Text>
        <Box flexDirection="column">
          {art.split('\n').map(l => (
            <Text mono>{l}</Text>
          ))}
        </Box>
        <Text dimColor>{line ? `"${line}"` : ' '}</Text>
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
            <Text mono>{l}</Text>
          ))}
        </Box>
        <Box flexDirection="column" gap={1}>
          <Text weight="bold">{a.name}</Text>
          <Text dimColor>{line ? `"${line}"` : ' '}</Text>
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
