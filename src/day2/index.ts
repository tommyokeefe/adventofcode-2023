import { Day } from "../day";

interface IGame {
    red: number,
    green: number,
    blue: number
}

class Day2 extends Day {

    constructor(){
        super(2);
    }

    solveForPartOne(input: string): string {
        const maxCubes = { red: 12, green: 13, blue: 14 };
        const games = input.split('\n');
        const total = games.reduce((total, game) => {
            const gameTotal = { game: 0, red: 0, blue: 0, green: 0 };
            const [name, rest] = game.split(':');
            const gameNumber = /Game (\d+)/.exec(name);
            gameTotal.game = gameNumber ? parseInt(gameNumber[1]) : 0;
            const rounds = rest.split(';');
            const highScores = rounds.reduce((previousTotal, round) => {
                const { red, blue, green } = previousTotal;
                const { red: newRed, blue: newBlue, green: newGreen } = this.extractValues(round);

                return {
                    game: previousTotal.game,
                    red: red >= newRed ? red : newRed,
                    blue: blue >= newBlue ? blue : newBlue,
                    green: green >= newGreen ? green : newGreen,
                };
            }, gameTotal);

            if (
                highScores.red <= maxCubes.red &&
                highScores.blue <= maxCubes.blue &&
                highScores.green <= maxCubes.green
            ) {
                return total + highScores.game;
            }

            return total;
        }, 0);
        return total.toString();
    }

    solveForPartTwo(input: string): string {
        const games = input.split('\n');
        const total = games.reduce((total, game) => {
            const gameTotal = { red: 1, blue: 1, green: 1 };
            const [_, rest] = game.split(':');
            const rounds = rest.split(';');
            const highScores = rounds.reduce((previousTotal, round) => {
                const { red, blue, green } = previousTotal;
                const { red: newRed, blue: newBlue, green: newGreen } = this.extractValues(round);

                return {
                    red: red >= newRed ? red : newRed,
                    blue: blue >= newBlue ? blue : newBlue,
                    green: green >= newGreen ? green : newGreen,
                };
            }, gameTotal);
            const { red, green, blue } = highScores;
            return total + (red * green * blue);
        }, 0);
        return total.toString();
    }

    extractValues(game: string): IGame {
        const redResult = /(\d+) red/.exec(game);
        const blueResult = /(\d+) blue/.exec(game);
        const greenResult = /(\d+) green/.exec(game);
        return {
            red: redResult ? parseInt(redResult[1]) : 0,
            blue: blueResult ? parseInt(blueResult[1]) : 0,
            green: greenResult ? parseInt(greenResult[1]) : 0,
        }
    };
}

export default new Day2;