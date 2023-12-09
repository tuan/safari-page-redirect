import { createContext } from 'react';

type TestSettings = {
  testUrl: string;
  setTestUrl: (newValue: string) => void;
};
const TestContext = createContext<TestSettings | null>(null);

export default TestContext;
