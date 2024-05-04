import day1 from './index';

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet;`

const input2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe('On Day 1', () =>{
    it(`should return the expected sum`, ()=>{
        expect(day1.solveForPartOne(input)).toBe('142');
    })
    it(`should return the expected sum`, ()=>{
        expect(day1.solveForPartTwo(input2)).toBe('281');
    })
});