import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "belami"
        ));
    });

    test("should not treat words containing 'age' as an age question", () => {
        const response = QueryProcessor("What is the average of 2 and 4?");
        expect(response).not.toBe("67");
    });

    test.each([
        ["What is 48 plus 70?", "118"],
        ["What is 12 minus 30?", "-18"],
        ["What is 6 multiplied by 7?", "42"],
        ["What is 2 to the power of 10?", "1024"],
        ["What is 99 to the power of 12?", "886384871716129280658801"],
        ["What is 1 plus 2 multiplied by 3?", "7"],
        ["What is 5 plus 3 plus 2?", "10"],
        ["Which of the following numbers is the largest: 12, 87, 43?", "87"],
        ["Which of the following numbers is both a square and a cube: 64, 100, 729, 8?", "64, 729"],
        ["Which of the following numbers are primes: 2, 9, 13, 21, 97?", "2, 13, 97"],
        ["What is the 10th number in the Fibonacci sequence?", "55"],
        ["What is 73 plus 89 multiplied by 58?", "5235"],
        ["What is 7 multiplied by 31 plus 43?", "260"],
        ['Which of the following is an anagram of "listen": enlists, google, inlets, banana?', "inlets"],
        ["What is the english scrabble score of cloud?", "8"],
        ["Which of the following is an anagram of admirer: dairy, border, forgot, married, random?", "married"],
        ["Which city is the Eiffel tower in?", "Paris"],
        ["What colour is a banana?", "yellow"],
        ["Who played James Bond in the film Dr No?", "Sean Connery"],
        ["What currency did Spain use before the Euro?", "peseta"],
        ["What is 100 divided by 4 minus 30?", "-5"],
        ["Which of the following numbers is both a square and a cube: 1, 4096, 50?", "1, 4096"],
    ])("answers %s", (query, expected) => {
        expect(QueryProcessor(query)).toBe(expected);
    });

    test("should return Andrew ID", () => {
        const response = QueryProcessor("What is your Andrew ID?");
        expect(response).toBe("bgisagew");
    });
});