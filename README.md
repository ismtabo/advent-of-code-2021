# Advent of code 2021

![](https://img.shields.io/badge/day%20📅-13-blue)
![](https://img.shields.io/badge/stars%20⭐-24-yellow)
![](https://img.shields.io/badge/days%20completed-12-red)

Repository of solutions for the [Advent of Code 2021][4] done by [ismtabo][1]

As last year the language I will use Typescript with [Deno][2]. Check the
repository of the [Advent of Code 2020][9].

## Usage

### Prerequisites

You may need to [install deno][3] to use this repository.

### CLI tool

After installing it you can run the solutions using the cli tool:

```
$ deno run -A --unstable src/cli/mod.ts -h

  Usage:   aoc2021
  Version: v0.1.0

  Description:

    Solutions for Advent of Code 2021. https://adventofcode.com/

  Options:

    -h, --help     - Show this help.
    -V, --version  - Show the version number for this program.

  Commands:

    run      - Run day solution
    run-all  - Run multiple day solution
    new      - Create new day solution folder skeleton
```

### Run a day solution

The solutions can be run with the `run` sub-command:

```
$ deno run -A --unstable src/cli/mod.ts run -h

  Usage:   aoc2021 run
  Version: v0.1.0

  Description:

    Run day solution

  Options:

    -h, --help                        - Show this help.
    -d, --day        <day:number>     - Day to run
    -p, --part       <part:number>    - Part of the day solution to run.                             (Default: 1)
    -a, --all-parts                   - Execute both parts. If present part option will be ignore.
    -t, --time                        - Show spent time
    -f, --file       <file:string>    - Input file. If missing, the day input file is used instead.
    --sample                          - Run day using sample input instead of day input file.        (conflicts: file)
    --format         <format:string>  - Output format.                                               (Default: "plain")
```

Also, to run all the solutions you can use `run-all` sub-command:

```
$ deno run -A --unstable src/cli/mod.ts run-all -h

  Usage:   aoc2021 run-all
  Version: v0.1.0

  Description:

    Run multiple day solution

  Options:

    -h, --help                        - Show this help.
    -p, --part       <part:number>    - Part of the day solution to run.                            (Default: 1)
    -a, --all-parts                   - Execute both parts. If present part option will be ignore.
    -t, --time                        - Show spent time
    --sample                          - Run day using sample input instead of day input file.
    --format         <format:string>  - Output format.                                              (Default: "plain")
```

### Test day solutions

Some of the day solutions have unit tests. To run them use
[deno built-in test runner][5]:

```
$ deno test [OPTIONS] [file]
```

Some of the test need `--allow-read` to read the sample inputs of its day.

### Bundle AOC 2021 solutions

Using [deno built-in bundler][8], you can bundle the problems module into a js
module:

```
$ deno bundle [OPTIONS] <source_file> [out_file]
```

To bundle the solutions module the `<source_file>` need to be
`src/problems/mod.ts`.

## Repository content

The source code of the repository is inside the `src` path:

### Folder

```
/ src
├- app: TBD
├-/ cli: Module of the cli tool to run problems and more
└-/ solutions: Module of solutions
```

### Cli tool structure

```
/ cli
├- template: Templates for day solution generation
├- mod.ts: Main module of the cli tool
├- type.d.ts: Types used in the cli tool
└- [...]: other stuff
```

### Day solution structure

Each day solution has the following structure:

```
/ dayX
├-/ {partOne,partTwo}: Modules of parts one and two
| ├- mod.ts: Main module of the part solution
| ├- [test.ts]: Test of the part solution
| ├- [type.d.ts]: Types of the part solution
| └- [...]: other stuff
| ...
├- mod.ts: Main module of the day solution
├- sample.txt: Sample input case
├- input.txt: Day input case
├- [type.d.ts]: Types used in both parts
└- [...]: other stuff
```

The main module exports two functions `main` and `preprocess` to run the
solution parts and preprocess the input respectively. Each part module exports a
function `partXxx` with its name in addition to other possible issues.

## Built with

- [Typescript][6] - Language used
- [Deno][2] - Runtime for Javascript and Typescript
- [Cliffy][7] - Command line framework for Deno

## Authors

- Ismael Taboada - Frontend developer - [@ismtabo][1]

## License

This repository is under MIT License - look up [LICENSE](./LICENSE) for more
details

[1]: https://github.com/ismtabo
[2]: https://deno.land/
[3]: https://deno.land/#installation
[4]: https://adventofcode.com/2021
[5]: https://deno.land/manual/testing
[6]: https://www.typescriptlang.org/
[7]: https://cliffy.io/
[8]: https://deno.land/manual@v1.6.0/tools/bundler
[9]: https://github.com/ismtabo/advent-of-code-2020
