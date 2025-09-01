import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/reports/reportsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    report_title: '',

    job: '',

    author: '',

    created_date: '',

}

const ReportsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/reports/reports-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
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

  <FormField label="Job" labelFor="job">
      <Field name="job" id="job" component={SelectField} options={[]} itemRef={'jobs'}></Field>
  </FormField>

  <FormField label="Author" labelFor="author">
      <Field name="author" id="author" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField
      label="CreatedDate"
  >
      <Field
          type="datetime-local"
          name="created_date"
          placeholder="CreatedDate"
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

ReportsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default ReportsNew
