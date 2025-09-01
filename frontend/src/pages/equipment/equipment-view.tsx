import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/equipment/equipmentSlice'
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

const EquipmentView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { equipment } = useAppSelector((state) => state.equipment)

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
              <title>{getPageTitle('View equipment')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View equipment')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/equipment/equipment-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>EquipmentName</p>
                    <p>{equipment?.equipment_name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>EquipmentType</p>
                    <p>{equipment?.equipment_type ?? 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>PerformanceRating</p>
                  <p>{equipment?.performance_rating || 'No data'}</p>
                </div>

                <FormField label='MaintenanceSchedule'>
                    {equipment.maintenance_schedule ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={equipment.maintenance_schedule ?
                        new Date(
                          dayjs(equipment.maintenance_schedule).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No MaintenanceSchedule</p>}
                </FormField>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/equipment/equipment-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

EquipmentView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default EquipmentView;
