import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { ModalComponet } from './ModalComponet';

const fetchWeatherData = async () => {
    console.log('Fetching weather data...');
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
};

export const MainComponet = React.memo(() => {
    // Default: React Query treats cached data as stale and refetches immediately
    const {
        /**
        * @property data
        * @type {any}
        * @default undefined
        * The resolved data returned by the `queryFn`.
        * You can provide a fallback like `data = []` to avoid undefined errors.
        */
        data = [],

        /**
         * @property isLoading
         * @type {boolean}
         * @default false
         * True when the query is in its initial loading state (first time fetch).
         */
        isLoading,

        /**
         * @property isFetching
         * @type {boolean}
         * @default false
         * True whenever the query is actively fetching data in the background.
         * This is true for initial load, refetch, or background refresh.
         */
        isFetching,

        /**
         * @property refetch
         * @type {() => Promise<QueryObserverResult>}
         * Function to manually trigger a refetch of the query.
         * Useful when `enabled: false` is set and you want to fetch on-demand.
         */
        refetch,

        /**
          * @property isPending
          * @type {boolean}
          * @default false
          * True when the query is in a **loading or fetching** state and has no data yet.
          * This replaces the need to manually check both `isLoading` and `data`.
          * Equivalent to: `isLoading && !data`
          */
        isPending,

        /**
         * @property isError
         * @type {boolean}
         * @default false
         * True if the query has encountered an error.
         * Useful for displaying error messages or fallback UI.
         */
        isError,

        /**
         * @property error
         * @type {unknown}
         * @default undefined
         * The actual error object thrown by the `queryFn`.
         * Use it to display or log specific error messages.
         */
        error,

        /**
         * @property isSuccess
         * @type {boolean}
         * @default false
         * True when the query has successfully fetched data **without any error**.
         * Indicates the query is complete and data is available.
         */
        isSuccess,

        /**
         * @property fetchStatus
         * @type {'idle' | 'fetching' | 'paused'}
         * @default 'idle'
         * Indicates the **network status** of the query.
         * - 'idle': No network request is happening.
         * - 'fetching': Query is actively making a network request.
         * - 'paused': Query is paused (e.g., offline mode).
         */
        fetchStatus,

        /**
         * @property status
         * @type {'pending' | 'error' | 'success'}
         * @default 'pending'
         * Describes the **overall lifecycle state** of the query.
         * - 'pending': Initial loading or background refetch with no data yet
         * - 'error': Query failed and exhausted retries
         * - 'success': Query successfully fetched data
         */
        status,
    } = useQuery({
        /**
         * @option queryKey
         * @type {Array | string}
         * @required ✅
         * @default undefined
         * @example ['main_components'] or 'main_components'
         * Unique key to identify the query in the cache.
         * Should be **stable** and ideally descriptive.
         */
        queryKey: ['main_components'],

        /**
         * @option queryFn
         * @type {() => Promise<any>}
         * @required ✅
         * @default undefined
         * A function that returns a promise.
         * This is the function React Query will call to fetch the data.
         * Must return a promise that resolves with the data.
         */
        queryFn: fetchWeatherData,

        /**
         * @option enabled
         * @type {boolean}
         * @required ❌
         * @default true
         * @min false
         * @max true
         * Whether the query should run automatically.
         * navigator.onLine = provide offile or online state of network
         */
        enabled: true,

        /**
         * @option refetchOnMount
         * @type {boolean | 'always'}
         * @required ❌
         * @default true
         * @min false
         * @max 'always'
         * Should refetch when component remounts.
         */
        refetchOnMount: false,

        /**
         * @option refetchOnWindowFocus
         * @type {boolean}
         * @required ❌
         * @default true
         * @min false
         * @max true
         * Refetches when window regains focus.
         */
        refetchOnWindowFocus: false,

        /**
         * @option refetchOnReconnect
         * @type {boolean}
         * @required ❌
         * @default true
         * @min false
         * @max true
         * Refetches when network reconnects.
         */
        refetchOnReconnect: false,

        /**
         * @option staleTime
         * @type {number}
         * @required ❌
         * @default 0
         * @min 0 (immediate staleness)
         * @max 1000 * 60 * 60 * 24 (24 hours) - Good practice limit
         * How long data stays fresh before needing refetch.
         */
        staleTime: 10000, // 10 Sec

        /**
         * @option cacheTime
         * @type {number}
         * @required ❌
         * @default 1000 * 60 * 5 (5 minutes)
         * @min 0 (immediate garbage collection)
         * @max 1000 * 60 * 60 * 24 (24 hours) - Good practice limit
         * How long unused cache stays in memory after last observer unmounts.
         */
        cacheTime: 5000, // 5 seconds

        /**
         * @option retry
         * @type {number | boolean}
         * @required ❌
         * @default 3
         * @min 0 (no retry)
         * @max 10 (beyond that, it's usually not helpful and may impact UX)
         * Number of retry attempts on failure.
         */
        retry: 6,

        /**
         * @option retryDelay
         * @type {number | (attemptIndex: number) => number}
         * @required ❌
         * @default attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
         * @min 0
         * @max 30000 (30 seconds) - Good UX practice to not delay longer
         * Time to wait between retries (ms). Can also be a backoff function.
         */
        retryDelay: 1000,
    });

    // console.log(isFetching, "Query", status ,"Result DeStructure", fetchStatus);
    console.log(navigator.onLine, "navigator");


    const [show, setShow] = useState(false);

    return (
        <>
            {show && <ModalComponet show={show} setShow={setShow}></ModalComponet>}
            <div>
                <h2>Product Info</h2>

                {isLoading ? (
                    <p>Loading ...</p>
                ) : (
                    <textarea rows={30} cols={60} defaultValue={data.map((data) => {
                        return data.title + '\n'
                    })}>
                    </textarea>

                )}

                {isFetching && <p>🔄 Updating data...</p>}
            </div>

            <button type='button' onClick={() => { refetch() }}>Fetch Data</button>
            <button type='button' onClick={() => { setShow(true) }}>Modal</button>

        </>
    );
})