import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/reports/reportsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditReports = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'report_title': '',

    job: null,

    author: null,

    created_date: new Date(),

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { reports } = useAppSelector((state) => state.reports)

  const { reportsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: reportsId }))
  }, [reportsId])

  useEffect(() => {
    if (typeof reports === 'object') {
      setInitialValues(reports)
    }
  }, [reports])

  useEffect(() => {
      if (typeof reports === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (reports)[el])

          setInitialValues(newInitialVal);
      }
  }, [reports])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: reportsId, data }))
    await router.push('/reports/reports-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit reports')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit reports'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="ReportTitle"
    >
        <Field
            name="report_title"
            placeholder="ReportTitle"
        />
    </FormField>

    <FormField label='Job' labelFor='job'>
        <Field
            name='job'
            id='job'
            component={SelectField}
            options={initialValues.job}
            itemRef={'jobs'}

            showField={'job_name'}

        ></Field>
    </FormField>

    <FormField label='Author' labelFor='author'>
        <Field
            name='author'
            id='author'
            component={SelectField}
            options={initialValues.author}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

      <FormField
          label="CreatedDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.created_date ?
                  new Date(
                      dayjs(initialValues.created_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'created_date': date})}
          />
      </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/reports/reports-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditReports.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditReports
