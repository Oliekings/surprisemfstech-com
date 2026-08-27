import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col selection:bg-white selection:text-black">
            <nav className="border-b border-white/10 bg-black backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="text-xl font-bold tracking-tighter uppercase text-white">
                                    SURPRISE-MFS TECH
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <Link
                                    href={window.route('admin.dashboard')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-mono uppercase tracking-widest"
                                >
                                    <span className={window.route().current('admin.dashboard') ? 'text-white border-b border-white' : 'text-zinc-500 hover:text-white transition-colors'}>Dashboard</span>
                                </Link>
                                <Link
                                    href={window.route('admin.projects.index')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-mono uppercase tracking-widest"
                                >
                                    <span className={window.route().current('admin.projects.index') ? 'text-white border-b border-white' : 'text-zinc-500 hover:text-white transition-colors'}>Projects</span>
                                </Link>
                                <Link
                                    href={window.route('admin.inquiries.index')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-mono uppercase tracking-widest"
                                >
                                    <span className={window.route().current('admin.inquiries.index') ? 'text-white border-b border-white' : 'text-zinc-500 hover:text-white transition-colors'}>Leads</span>
                                </Link>
                                <Link
                                    href={window.route('home')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-mono uppercase tracking-widest ml-6 opacity-30 hover:opacity-100 transition-opacity"
                                >
                                    View Site ↗
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md bg-transparent px-3 py-2 text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={window.route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={window.route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:text-white transition-colors"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <Link
                            href={window.route('admin.dashboard')}
                            className="block px-4 py-2 text-base font-mono uppercase tracking-widest text-white"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={window.route('admin.projects.index')}
                            className="block px-4 py-2 text-base font-mono uppercase tracking-widest text-zinc-400"
                        >
                            Projects
                        </Link>
                        <Link
                            href={window.route('admin.inquiries.index')}
                            className="block px-4 py-2 text-base font-mono uppercase tracking-widest text-zinc-400"
                        >
                            Leads
                        </Link>
                    </div>

                    <div className="border-t border-white/10 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-zinc-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <Link href={window.route('profile.edit')} className="block px-4 py-2 text-base font-mono uppercase tracking-widest text-zinc-400">
                                Profile
                            </Link>
                            <Link
                                method="post"
                                href={window.route('logout')}
                                as="button"
                                className="block px-4 py-2 text-base font-mono uppercase tracking-widest text-zinc-400 w-full text-left"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-zinc-900 border-b border-white/5">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-mono tracking-widest uppercase">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-grow">{children}</main>
        </div>
    );
}
