import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic'

interface TernSecureProviderProps {
  children: ReactNode;
}

// Dynamically import the client provider with no SSR
const TernSecureClientProvider = dynamic(
  () => import('../../client/providers/ternSecureClientProvider').then(mod => mod.TernSecureClientProvider),
  { 
    //ssr: false,
    loading: () => null // Return null or a loading indicator
  }
)

export function TernSecureProvider({ children }: TernSecureProviderProps) {
  // Check if the children contain html/body tags
  const isRootLayout = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === 'html'
  );

  if (isRootLayout) {
    // If this is the root layout, inject our provider after the body tag
    return React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === 'html') {
        return React.cloneElement(child, {}, 
          React.Children.map(child.props.children, bodyChild => {
            if (React.isValidElement(bodyChild) && bodyChild.type === 'body') {
              // Type assertion to access props safely
              const bodyProps = bodyChild.props as { children: ReactNode };
              return React.cloneElement(bodyChild, {}, 
                <TernSecureClientProvider>
                  {bodyProps.children}
                </TernSecureClientProvider>
              );
            }
            return bodyChild;
          })
        );
      }
      return child;
    });
  }

  // For non-root layouts, wrap normally
  return <TernSecureClientProvider>{children}</TernSecureClientProvider>;
}