import { Pokemon, PokemonClient} from 'pokenode-ts';
import { performance } from 'perf_hooks';

export default class Analyzer {

    api: PokemonClient;
    start: number;
    responses: Pokemon[] = [];
    promises: any[] = [];
    averageHeight: number;
    averageWeight: number;

    constructor(offset: number, limit: number) {

        if ( limit <= 0 ) {
            return null;
        } else {

            // Enable cache for one minute to improve speed
            this.api = new PokemonClient({
                cacheOptions: {maxAge: 60 * 1000, exclude: {query: false}},
            });
            this.start = performance.now();
            this.averageWeight = 0;
            this.averageHeight = 0;

            (async () => {

                this.api
                    .listPokemons( offset, limit )
                    .then(async (data) => {
                        data.results.map(async (pokemon) => {
                            this.promises.push(this.getData(pokemon.name))
                        })

                        await Promise.allSettled(this.promises)

                        console.log('Average height: ' + (this.averageHeight/limit).toFixed(2))
                        console.log('Average weight: ' + (this.averageWeight/limit).toFixed(2))
                        console.log('Execution time: ' + (performance.now() - this.start).toFixed(3) + 'ms')
                    })
                    .catch((error) => console.error(error));

            })();

        }

    }

    getData(name: string) {
        return new Promise<void>((resolve, reject) => {
            this.api
                .getPokemonByName(name)
                .then((data) =>  {
                    this.averageHeight += data.height
                    this.averageWeight += data.weight
                    this.responses.push(data)
                    resolve();
                })
                .catch((error) => reject())
        })
    }

}

function areWeTestingWithJest() {
    return process.env.JEST_WORKER_ID !== undefined;
}

if (!areWeTestingWithJest()) {
    if (process.argv.length != 4) {
        console.log('The required arguments were not passed. Please use the following command: node main.js <offset> <limit>')
    } else {
        let analyzer = new Analyzer( parseInt(process.argv[2]), parseInt(process.argv[3]) );
    }
}