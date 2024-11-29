import React from 'react';
import { TernSecureState } from '../../../types';
declare const TernSecureContext: React.Context<[TernSecureState, React.Dispatch<React.SetStateAction<TernSecureState>>]>;
declare const useTernSecure: (hookname?: string) => [TernSecureState, React.Dispatch<React.SetStateAction<TernSecureState>>];
export declare const initialState: TernSecureState;
export { TernSecureContext, useTernSecure };
