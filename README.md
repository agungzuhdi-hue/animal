# ASCII Menagerie

A small Claude Code mod that keeps an animated ASCII animal in a pane beside your session.
Six animals take turns (cat, bunny, owl, fish, penguin, snail). Press **Pet** to make the
animal talk, or **Next animal** to switch. The animal also reacts while Claude works: it
notices a new prompt, watches each tool call, and cheers when the turn finishes.

Run `/menagerie` to open the pane again if you close it.

If the side pane has no room (a narrow terminal), the animal shows above the prompt instead.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install ascii-menagerie --marketplace agungzuhdi-hue/animal
```

From a shell:

```
claude plugin install ascii-menagerie --marketplace agungzuhdi-hue/animal
```

In the Claude desktop app: click + next to the prompt box, then Plugins, Add marketplace with `agungzuhdi-hue/animal`, then Add plugin.
