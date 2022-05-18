module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    silent: true,
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};