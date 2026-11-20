# ASCII Menagerie

A small Claude Code mod that keeps an animated ASCII animal just above the prompt box of your session.
Twelve animals take turns (cat, bunny, owl, fish, penguin, snail, dog, frog, turtle, mouse, bear, bat).

What you can do with the animal:

- **Pet**: hearts float above it and it says something sweet.
- **Feed**: it munches its favourite food (the cat gets a fish, the bear a pot of honey).
- **Play**: it hops from side to side.
- **Sleep / Wake up**: it closes its eyes and snores until you wake it.
- **Next** and **Surprise me**: switch to the next animal or a random one.
- **Smaller / Bigger**: by default the animal sits on one short line so it covers little of the chat; press Bigger for the full drawing.
- **Hide**: takes the animal away completely; type `/menagerie` to bring it back.
- **Brick look / Classic look**: switch between animals built from toy bricks (the default) and classic keyboard-character art.

A love meter (five hearts) fills when you pet, feed or play, and slowly empties if you leave the
animal alone. The animal also reacts while Claude works: it notices a new prompt, watches each
tool call, and cheers when the turn finishes (unless it is asleep).

Run `/menagerie-pane` to also show it in a side pane.


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
