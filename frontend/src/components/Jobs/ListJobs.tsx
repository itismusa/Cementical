import React from 'react';
import CardBox from '../CardBox';
import dataFormatter from '../../helpers/dataFormatter';
import ListActionsPopover from "../ListActionsPopover";
import {useAppSelector} from "../../stores/hooks";
import {Pagination} from "../Pagination";
import LoadingSpinner from "../LoadingSpinner";
import Link from 'next/link';

type Props = {
    jobs: any[];
    loading: boolean;
    onDelete: (id: string) => void;
    currentPage: number;
    numPages: number;
    onPageChange: (page: number) => void;
};

const ListJobs = ({ jobs, loading, onDelete, currentPage, numPages, onPageChange }: Props) => {
    const corners = useAppSelector((state) => state.style.corners);
    const bgColor = useAppSelector((state) => state.style.cardsColor);

    return (
        <>
            <div className='relative overflow-x-auto p-4 space-y-4'>
                {loading && <LoadingSpinner />}
                {!loading && jobs.map((item) => (
                  <div key={item.id}>
                    <CardBox hasTable isList className={'rounded shadow-none'}>
                        <div className={`flex rounded dark:bg-dark-900 border items-center overflow-hidden`}>
                          <Link
                              href={`/jobs/jobs-view/?id=${item.id}`}
                              className={
                                  'flex-1 px-4 py-6 h-24 flex divide-x-2 divide-stone-300 items-center overflow-hidden dark:divide-dark-700 overflow-x-auto'
                              }
                          >

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>JobName</p>
                                <p className={'line-clamp-2'}>{ item.job_name }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>AssignedEngineer</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.usersOneListFormatter(item.assigned_engineer) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>AssignedSupervisor</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.usersOneListFormatter(item.assigned_supervisor) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>JobType</p>
                                <p className={'line-clamp-2'}>{ item.job_type }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>StartDate</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.dateTimeFormatter(item.start_date) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>EndDate</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.dateTimeFormatter(item.end_date) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Depth</p>
                                <p className={'line-clamp-2'}>{ item.depth }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>CasingSize</p>
                                <p className={'line-clamp-2'}>{ item.casing_size }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>SlurryVolume</p>
                                <p className={'line-clamp-2'}>{ item.slurry_volume }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>SlurryDensity</p>
                                <p className={'line-clamp-2'}>{ item.slurry_density }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Cost</p>
                                <p className={'line-clamp-2'}>{ item.cost }</p>
                            </div>

                          </Link>
                            <ListActionsPopover
                              onDelete={onDelete}
                              itemId={item.id}
                              pathEdit={`/jobs/jobs-edit/?id=${item.id}`}
                              pathView={`/jobs/jobs-view/?id=${item.id}`}
                              hasUpdatePermission={true}
                            />
                        </div>
                    </CardBox>
                  </div>
                ))}
                {!loading && jobs.length === 0 && (
                  <div className='col-span-full flex items-center justify-center h-40'>
                      <p className=''>No data to display</p>
                  </div>
                )}
            </div>
            <div className={'flex items-center justify-center my-6'}>
                <Pagination
                  currentPage={currentPage}
                  numPages={numPages}
                  setCurrentPage={onPageChange}
                />
            </div>
        </>
    )
};

export default ListJobs
