// resources/js/Components/Dropdown.tsx
import React from 'react';
import { Link } from '@inertiajs/react';

const Dropdown = {
    Link: ({ href, children, as = 'a', ...props }: any) => {
        if (as === 'button') {
            return (
                <button
                    {...props}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    {children}
                </button>
            );
        }

        return (
            <Link
                href={href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                {...props}
            >
                {children}
            </Link>
        );
    },
};

export default Dropdown;
