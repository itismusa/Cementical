import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/jobs/jobsSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const JobsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { jobs } = useAppSelector((state) => state.jobs)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View jobs')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View jobs')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/jobs/jobs-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>JobName</p>
                    <p>{jobs?.job_name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>AssignedEngineer</p>

                        <p>{jobs?.assigned_engineer?.firstName ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>AssignedSupervisor</p>

                        <p>{jobs?.assigned_supervisor?.firstName ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>JobType</p>
                    <p>{jobs?.job_type ?? 'No data'}</p>
                </div>

                <FormField label='StartDate'>
                    {jobs.start_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={jobs.start_date ?
                        new Date(
                          dayjs(jobs.start_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No StartDate</p>}
                </FormField>

                <FormField label='EndDate'>
                    {jobs.end_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={jobs.end_date ?
                        new Date(
                          dayjs(jobs.end_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No EndDate</p>}
                </FormField>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Depth</p>
                  <p>{jobs?.depth || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>CasingSize</p>
                  <p>{jobs?.casing_size || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>SlurryVolume</p>
                  <p>{jobs?.slurry_volume || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>SlurryDensity</p>
                  <p>{jobs?.slurry_density || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Cost</p>
                  <p>{jobs?.cost || 'No data'}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Reports Job</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>ReportTitle</th>

                                <th>CreatedDate</th>

                            </tr>
                            </thead>
                            <tbody>
                            {jobs.reports_job && Array.isArray(jobs.reports_job) &&
                              jobs.reports_job.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/reports/reports-view/?id=${item.id}`)}>

                                    <td data-label="report_title">
                                        { item.report_title }
                                    </td>

                                    <td data-label="created_date">
                                        { dataFormatter.dateTimeFormatter(item.created_date) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!jobs?.reports_job?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/jobs/jobs-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

JobsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default JobsView;
