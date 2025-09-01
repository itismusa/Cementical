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

import { update, fetch } from '../../stores/jobs/jobsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditJobs = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'job_name': '',

    assigned_engineer: null,

    assigned_supervisor: null,

    job_type: '',

    start_date: new Date(),

    end_date: new Date(),

    'depth': '',

    'casing_size': '',

    'slurry_volume': '',

    'slurry_density': '',

    'cost': '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { jobs } = useAppSelector((state) => state.jobs)

  const { jobsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: jobsId }))
  }, [jobsId])

  useEffect(() => {
    if (typeof jobs === 'object') {
      setInitialValues(jobs)
    }
  }, [jobs])

  useEffect(() => {
      if (typeof jobs === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (jobs)[el])

          setInitialValues(newInitialVal);
      }
  }, [jobs])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: jobsId, data }))
    await router.push('/jobs/jobs-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit jobs')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit jobs'} main>
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
        label="JobName"
    >
        <Field
            name="job_name"
            placeholder="JobName"
        />
    </FormField>

    <FormField label='AssignedEngineer' labelFor='assigned_engineer'>
        <Field
            name='assigned_engineer'
            id='assigned_engineer'
            component={SelectField}
            options={initialValues.assigned_engineer}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField label='AssignedSupervisor' labelFor='assigned_supervisor'>
        <Field
            name='assigned_supervisor'
            id='assigned_supervisor'
            component={SelectField}
            options={initialValues.assigned_supervisor}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
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
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.start_date ?
                  new Date(
                      dayjs(initialValues.start_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'start_date': date})}
          />
      </FormField>

      <FormField
          label="EndDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.end_date ?
                  new Date(
                      dayjs(initialValues.end_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'end_date': date})}
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

EditJobs.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditJobs
