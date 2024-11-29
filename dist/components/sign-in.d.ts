import * as React from 'react';
export interface SignInProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    redirectUrl?: string;
    className?: string;
    style?: React.CSSProperties;
    customStyles?: {
        container?: string;
        header?: string;
        title?: string;
        formWrapper?: string;
        formContainer?: string;
        form?: string;
        input?: string;
        button?: string;
        errorText?: string;
        label?: string;
    };
}
export declare function SignIn({ onSuccess, onError, redirectUrl, className, style, customStyles }: SignInProps): React.JSX.Element;
