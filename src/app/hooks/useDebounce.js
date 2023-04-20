import { useState, useEffect } from 'react';

export default function useDebounce(inittialzeValue = '', delay = 1000) {
    const [debounceValue, setDebounceValue] = useState(inittialzeValue)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(inittialzeValue)
        }, delay)
        return () => clearTimeout(timer)
    }, [inittialzeValue, delay])
    return debounceValue
}