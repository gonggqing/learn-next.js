'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // this helps to avoid making a request for every key stroke, and set a delay callback after user stop typing

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // use this hook in client side to avoid go back to the server
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname();
  const { replace } = useRouter(); // automatically change the url without reloading the page

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching for ${term}`);
    params.set('page', '1')
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`)
  }, 2000)
  

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
