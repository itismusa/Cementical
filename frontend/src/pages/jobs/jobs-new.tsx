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

import { create } from '../../stores/jobs/jobsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    job_name: '',

    assigned_engineer: '',

    assigned_supervisor: '',

    job_type: 'Conventional',

    start_date: '',

    end_date: '',

    depth: '',

    casing_size: '',

    slurry_volume: '',

    slurry_density: '',

    cost: '',

}

const JobsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/jobs/jobs-list')
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
      label="JobName"
  >
      <Field
          name="job_name"
          placeholder="JobName"
      />
  </FormField>

  <FormField label="AssignedEngineer" labelFor="assigned_engineer">
      <Field name="assigned_engineer" id="assigned_engineer" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField label="AssignedSupervisor" labelFor="assigned_supervisor">
      <Field name="assigned_supervisor" id="assigned_supervisor" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField label="JobType" labelFor="job_type">
      <Field name="job_type" id="job_type" component="select">

        <option value="Conventional">Conventional</option>

        <option value="Horizontal">Horizontal</option>

        <option value="High-pressure/High-temperature">High-pressure/High-temperature</option>

        <option value="Offshore">Offshore</option>

        <option value="Remedial">Remedial</option>

      </Field>
  </FormField>

  <FormField
      label="StartDate"
  >
      <Field
          type="datetime-local"
          name="start_date"
          placeholder="StartDate"
      />
  </FormField>

  <FormField
      label="EndDate"
  >
      <Field
          type="datetime-local"
          name="end_date"
          placeholder="EndDate"
      />
  </FormField>

    <FormField
        label="Depth"
    >
        <Field
            type="number"
            name="depth"
            placeholder="Depth"
        />
    </FormField>

    <FormField
        label="CasingSize"
    >
        <Field
            type="number"
            name="casing_size"
            placeholder="CasingSize"
        />
    </FormField>

    <FormField
        label="SlurryVolume"
    >
        <Field
            type="number"
            name="slurry_volume"
            placeholder="SlurryVolume"
        />
    </FormField>

    <FormField
        label="SlurryDensity"
    >
        <Field
            type="number"
            name="slurry_density"
            placeholder="SlurryDensity"
        />
    </FormField>

    <FormField
        label="Cost"
    >
        <Field
            type="number"
            name="cost"
            placeholder="Cost"
        />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/jobs/jobs-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

JobsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default JobsNew
