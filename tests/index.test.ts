import Analyzer from '../src/main';

describe('testing main file', () => {
    it('will return an empty response when the limit is zero', () => {
        expect(new Analyzer(0, 0)).toEqual({"promises": [], "responses": []});
    });

    it('update the averages once we get data from a pokemon', async () => {
        const data = new Analyzer(0, 1);
        expect(data.api).toBeDefined();

        await data.getData('ditto');
        expect(data.averageHeight).toBe(3);
        expect(data.averageWeight).toBe(40);
    });

});