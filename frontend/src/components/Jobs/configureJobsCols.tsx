import React from 'react';
import BaseIcon from '../BaseIcon';
import { mdiEye, mdiTrashCan, mdiPencilOutline } from '@mdi/js';
import axios from 'axios';
import {
    GridActionsCellItem,
    GridRowParams,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import dataFormatter from '../../helpers/dataFormatter'
import DataGridMultiSelect from "../DataGridMultiSelect";
import ListActionsPopover from '../ListActionsPopover';
type Params = (id: string) => void;

export const loadColumns = async (
    onDelete: Params,
    entityName: string,
) => {
    async function callOptionsApi(entityName: string) {
        try {
        const data = await axios(`/${entityName}/autocomplete?limit=100`);
        return data.data;
        } catch (error) {
         console.log(error);
         return [];
        }
    }
    return [

        {
            field: 'job_name',
            headerName: 'JobName',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,

        },

        {
            field: 'assigned_engineer',
            headerName: 'AssignedEngineer',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('users'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,

        },

        {
            field: 'assigned_supervisor',
            headerName: 'AssignedSupervisor',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            sortable: false,
            type: 'singleSelect',
            getOptionValue: (value: any) => value?.id,
            getOptionLabel: (value: any) => value?.label,
            valueOptions: await callOptionsApi('users'),
            valueGetter: (params: GridValueGetterParams) =>
                params?.value?.id ?? params?.value,

        },

        {
            field: 'job_type',
            headerName: 'JobType',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,

        },

        {
            field: 'start_date',
            headerName: 'StartDate',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            type: 'dateTime',
            valueGetter: (params: GridValueGetterParams) =>
                new Date(params.row.start_date),

        },

        {
            field: 'end_date',
            headerName: 'EndDate',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            type: 'dateTime',
            valueGetter: (params: GridValueGetterParams) =>
                new Date(params.row.end_date),

        },

        {
            field: 'depth',
            headerName: 'Depth',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            type: 'number',

        },

        {
            field: 'casing_size',
            headerName: 'CasingSize',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            type: 'number',

        },

        {
            field: 'slurry_volume',
            headerName: 'SlurryVolume',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            type: 'number',

        },

        {
            field: 'slurry_density',
            headerName: 'SlurryDensity',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            type: 'number',

        },

        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            minWidth: 120,
            filterable: false,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',

            editable: true,
            type: 'number',

        },

        {
            field: 'actions',
            type: 'actions',
            minWidth: 30,
            headerClassName: 'datagrid--header',
            cellClassName: 'datagrid--cell',
            getActions: (params: GridRowParams) => {

               return [
                   <div key={params?.row?.id}>
                      <ListActionsPopover
                      onDelete={onDelete}
                      itemId={params?.row?.id}
                      pathEdit={`/jobs/jobs-edit/?id=${params?.row?.id}`}
                      pathView={`/jobs/jobs-view/?id=${params?.row?.id}`}
                      hasUpdatePermission={true}
                    />
                   </div>,
                  ]
            },
        },
    ];
};
