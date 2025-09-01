import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/users/usersSlice'
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

const UsersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users)

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
              <title>{getPageTitle('View users')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View users')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/users/users-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>First Name</p>
                    <p>{users?.firstName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Last Name</p>
                    <p>{users?.lastName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phone Number</p>
                    <p>{users?.phoneNumber}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>E-Mail</p>
                    <p>{users?.email}</p>
                </div>

                <FormField label='Disabled'>
                    <SwitchField
                      field={{name: 'disabled', value: users?.disabled}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <>
                    <p className={'block font-bold mb-2'}>Jobs AssignedEngineer</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>JobName</th>

                                <th>JobType</th>

                                <th>StartDate</th>

                                <th>EndDate</th>

                                <th>Depth</th>

                                <th>CasingSize</th>

                                <th>SlurryVolume</th>

                                <th>SlurryDensity</th>

                                <th>Cost</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.jobs_assigned_engineer && Array.isArray(users.jobs_assigned_engineer) &&
                              users.jobs_assigned_engineer.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/jobs/jobs-view/?id=${item.id}`)}>

                                    <td data-label="job_name">
                                        { item.job_name }
                                    </td>

                                    <td data-label="job_type">
                                        { item.job_type }
                                    </td>

                                    <td data-label="start_date">
                                        { dataFormatter.dateTimeFormatter(item.start_date) }
                                    </td>

                                    <td data-label="end_date">
                                        { dataFormatter.dateTimeFormatter(item.end_date) }
                                    </td>

                                    <td data-label="depth">
                                        { item.depth }
                                    </td>

                                    <td data-label="casing_size">
                                        { item.casing_size }
                                    </td>

                                    <td data-label="slurry_volume">
                                        { item.slurry_volume }
                                    </td>

                                    <td data-label="slurry_density">
                                        { item.slurry_density }
                                    </td>

                                    <td data-label="cost">
                                        { item.cost }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.jobs_assigned_engineer?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Jobs AssignedSupervisor</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>JobName</th>

                                <th>JobType</th>

                                <th>StartDate</th>

                                <th>EndDate</th>

                                <th>Depth</th>

                                <th>CasingSize</th>

                                <th>SlurryVolume</th>

                                <th>SlurryDensity</th>

                                <th>Cost</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.jobs_assigned_supervisor && Array.isArray(users.jobs_assigned_supervisor) &&
                              users.jobs_assigned_supervisor.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/jobs/jobs-view/?id=${item.id}`)}>

                                    <td data-label="job_name">
                                        { item.job_name }
                                    </td>

                                    <td data-label="job_type">
                                        { item.job_type }
                                    </td>

                                    <td data-label="start_date">
                                        { dataFormatter.dateTimeFormatter(item.start_date) }
                                    </td>

                                    <td data-label="end_date">
                                        { dataFormatter.dateTimeFormatter(item.end_date) }
                                    </td>

                                    <td data-label="depth">
                                        { item.depth }
                                    </td>

                                    <td data-label="casing_size">
                                        { item.casing_size }
                                    </td>

                                    <td data-label="slurry_volume">
                                        { item.slurry_volume }
                                    </td>

                                    <td data-label="slurry_density">
                                        { item.slurry_density }
                                    </td>

                                    <td data-label="cost">
                                        { item.cost }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.jobs_assigned_supervisor?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Reports Author</p>
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
                            {users.reports_author && Array.isArray(users.reports_author) &&
                              users.reports_author.map((item: any) => (
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
                        {!users?.reports_author?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/users/users-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default UsersView;
