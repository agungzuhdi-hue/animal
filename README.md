# ASCII Menagerie

A small Claude Code mod that keeps an animated ASCII animal just above the prompt box of your session.
Twelve animals take turns (cat, bunny, owl, fish, penguin, snail, dog, frog, turtle, mouse, bear, bat).

What you can do with the animal:

- **Pet**: hearts float above it and it says something sweet.
- **Feed**: it munches its favourite food (the cat gets a fish, the bear a pot of honey).
- **Play**: it hops from side to side.
- **Sleep / Wake up**: it closes its eyes and snores until you wake it.
- **Next** and **Surprise me**: switch to the next animal or a random one.

A love meter (five hearts) fills when you pet, feed or play, and slowly empties if you leave the
animal alone. The animal also reacts while Claude works: it notices a new prompt, watches each
tool call, and cheers when the turn finishes (unless it is asleep).

Run `/menagerie` to also show it in a side pane.


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
