export type Mood = { text: string; until: number }
export type Act = { kind: 'pet' | 'feed' | 'play'; until: number }

declare module 'claude-code' {
  interface PluginState {
    'ascii-menagerie': {
      frame: number
      animal: number
      mood: Mood | null
      act: Act | null
      love: number
      isAsleep: boolean
      isBricks: boolean
      isMini: boolean
    }
  }
}
