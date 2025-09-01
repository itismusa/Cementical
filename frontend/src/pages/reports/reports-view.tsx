import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/reports/reportsSlice'
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

const ReportsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { reports } = useAppSelector((state) => state.reports)

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
              <title>{getPageTitle('View reports')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View reports')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/reports/reports-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>ReportTitle</p>
                    <p>{reports?.report_title}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Job</p>

                        <p>{reports?.job?.job_name ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Author</p>

                        <p>{reports?.author?.firstName ?? 'No data'}</p>

                </div>

                <FormField label='CreatedDate'>
                    {reports.created_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={reports.created_date ?
                        new Date(
                          dayjs(reports.created_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No CreatedDate</p>}
                </FormField>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/reports/reports-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

ReportsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default ReportsView;
