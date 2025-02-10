class Benchmark {
    constructor() {
        this.tests = {};
    }

    createTestSuite(name) {
        this.tests[name] = {
            fonctions: [],
            iterations: 1,
            parametres: [],
        };
    }

    addfonction(testSuiteName, fonction) {
        if (this.tests[testSuiteName]) {
            this.tests[testSuiteName].fonctions.push(fonction);
        }
    }

    setIterations(testSuiteName, iterations) {
        if (this.tests[testSuiteName]) {
            this.tests[testSuiteName].iterations = iterations;
        }
    }

    setparametres(testSuiteName, ...parametres) {
        if (this.tests[testSuiteName]) {
            this.tests[testSuiteName].parametres = parametres;
        }
    }

    runTestSuite(testSuiteName) {
        if (!this.tests[testSuiteName]) return;

        const { fonctions, iterations, parametres } = this.tests[testSuiteName];
        const results = fonctions.map((fonction) => {
            const times = [];
            for (let i = 0; i < iterations; i++) {
                const start = performance.now();
                fonction(...parametres);
                const end = performance.now();
                times.push(end - start);
            }
            const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
            return { fonction, averageTime };
        });

        results.sort((a, b) => a.averageTime - b.averageTime);

        console.log(`Test Suite: ${testSuiteName}`);
        results.forEach((result, index) => {
            console.log(`function ${index}: ${result.averageTime} ms`);
        });
        console.log(`Fastest function: ${results[0].averageTime} ms`);
        console.log(`Slowest function: ${results[results.length - 1].averageTime} ms`);
    }
}

// fonctions
function containsDuplicate(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                return true;
            }
        }
    }
    return false;
}

function findCommonElements(array1, array2) {
    let commonElements = [];
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j]) {
                commonElements.push(array1[i]);
            }
        }
    }
    return commonElements;
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}


// test
const benchmark = new Benchmark();
benchmark.createTestSuite('Example Test Suite');
benchmark.addfonction('Example Test Suite', containsDuplicate);
benchmark.addfonction('Example Test Suite', findCommonElements);
benchmark.setparametres('Example Test Suite', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [5, 6, 7, 8, 9, 10]);
benchmark.runTestSuite('Example Test Suite');
