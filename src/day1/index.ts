import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    private numbersDict: { [key:string]: string } = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    }

    solveForPartOne(input: string): string {
        return input
            .split(/\n/)
            .reduce((total: number, line: string) => {
                const numbers = line.split('').filter(character => character.match(/^-?\d+$/));
                return total + parseInt(`${numbers[0]}${numbers[numbers.length -1]}`);
             }, 0)
            .toString();
    }

    solveForPartTwo(input: string): string {
        return input
        .split(/\n/)
        .reduce((total: number, line: string) => {
            const wordValues = Object.keys(this.numbersDict).reduce((results: {position: number, value: string}[], number: string) => {
                const regexp = new RegExp(number, 'g');
                const positions = line.matchAll(regexp);
                for (const position of positions) {
                    if (position.index !== undefined && position.index !== -1) {
                        results =  [...results, { position: position.index, value: this.numbersDict[number] }];
                    }
                }
                return results;
            }, [])
            const values = Object.values(this.numbersDict).reduce((results: {position: number, value: string}[], number: string) => {
                const regexp = new RegExp(number, 'g');
                const positions = line.matchAll(regexp);
                for (const position of positions) {
                    if (position.index !== undefined && position.index !== -1) {
                        results =  [...results, { position: position.index, value: number }];
                    }
                }
                return results;
            }, wordValues);
            const sortedValues = values.sort((a, b) => a.position <= b.position ? -1 : 1);
            const newValue = `${sortedValues[0].value}${sortedValues[sortedValues.length -1].value}`
            return total + parseInt(newValue);
         }, 0)
        .toString();
    }
}

export default new Day1;