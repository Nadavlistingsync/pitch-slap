module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/app/__tests__/setup.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/app/__tests__/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@headlessui|@heroicons)/)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/app/__tests__/setup.tsx',
    '<rootDir>/src/app/__tests__/__mocks__/',
    '<rootDir>/src/app/__tests__/types.d.ts'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
}; 