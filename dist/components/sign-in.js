import * as React from 'react';
import { useState } from 'react';
import { signInWithEmail } from '../app-router/client';
import { styles } from '../utils/create-styles';
export function SignIn({ onSuccess, onError, redirectUrl, className = '', style, customStyles = {} }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmail({ email, password });
            onSuccess?.();
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to sign in';
            setError(errorMessage);
            onError?.(err instanceof Error ? err : new Error('Failed to sign in'));
        }
        finally {
            setLoading(false);
        }
    };
    return (React.createElement("div", { className: `${styles.container} ${customStyles.container || ''}`, style: style },
        React.createElement("div", { className: `${styles.header} ${customStyles.header || ''}` },
            React.createElement("h2", { className: `${styles.title} ${customStyles.title || ''}` }, "Sign in to your account")),
        React.createElement("div", { className: `${styles.formWrapper} ${customStyles.formWrapper || ''}` },
            React.createElement("div", { className: `${styles.formContainer} ${customStyles.formContainer || ''}` },
                React.createElement("form", { onSubmit: handleSubmit, className: `${styles.form} ${customStyles.form || ''} ${className}`, role: "form", "aria-label": "Sign in form" },
                    error && (React.createElement("div", { className: `${styles.error} ${customStyles.errorText || ''}`, role: "alert", "aria-live": "polite" }, error)),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "email", className: `${styles.label} ${customStyles.label || ''}` }, "Email"),
                        React.createElement("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email", required: true, className: `${styles.input} ${customStyles.input || ''}`, disabled: loading, "aria-required": "true", "aria-invalid": !!error })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "password", className: `${styles.label} ${customStyles.label || ''}` }, "Password"),
                        React.createElement("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", required: true, className: `${styles.input} ${customStyles.input || ''}`, disabled: loading, "aria-required": "true", "aria-invalid": !!error })),
                    React.createElement("button", { type: "submit", disabled: loading, className: `${styles.button} ${customStyles.button || ''}`, "data-testid": "sign-in-submit" }, loading ? 'Signing in...' : 'Sign in'))))));
}
//# sourceMappingURL=sign-in.js.map