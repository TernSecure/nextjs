import React, { ReactNode } from 'react';
interface TernSecureProviderProps {
    children: ReactNode;
}
export declare function TernSecureProvider({ children }: TernSecureProviderProps): React.JSX.Element | (string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>)[] | null | undefined;
export {};
