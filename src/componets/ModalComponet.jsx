import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';

const fetchWeatherData = async () => {
    console.log('Fetching weather data...');
    const response = await axios.get('https://fake-json-api.mock.beeceptor.com/companies');
    return response.data;
};

export const ModalComponet = (props) => {
    // Default: React Query treats cached data as stale and refetches immediately
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['modal_componets'],
        queryFn: fetchWeatherData,
    });

    const queryClient = useQueryClient();

    return (
        <Modal isOpen={props?.show}>
            <div>

                <h2>Company Info</h2>

                {isLoading ? (
                    <p>Loading ...</p>
                ) : (
                    <textarea rows={15} defaultValue={data.map((data) => {
                        return data.name + '\n'
                    })}></textarea>
                )}

                {isFetching && <p>🔄 Updating data...</p>}

            </div>

            <button type='button' onClick={() => {
                queryClient.removeQueries(['modal_componets']);
                props.setShow(false)
            }}>Close</button>

        </Modal >
    );
};