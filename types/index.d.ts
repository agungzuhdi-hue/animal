export type Mood = { text: string; until: number }

declare module 'claude-code' {
  interface PluginState {
    'ascii-menagerie': { frame: number; animal: number; mood: Mood | null }
  }
}
