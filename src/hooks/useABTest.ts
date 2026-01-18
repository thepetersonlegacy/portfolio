import { useEffect, useState } from 'react';

export const useABTest = (testName: string, variants: string[]): string => {
  const [variant, setVariant] = useState<string>('');
  
  useEffect(() => {
    const stored = localStorage.getItem(`ab_test_${testName}`);
    if (stored && variants.includes(stored)) {
      setVariant(stored);
    } else {
      const random = variants[Math.floor(Math.random() * variants.length)];
      setVariant(random);
      localStorage.setItem(`ab_test_${testName}`, random);
    }
  }, [testName, variants]);
  
  return variant;
};

