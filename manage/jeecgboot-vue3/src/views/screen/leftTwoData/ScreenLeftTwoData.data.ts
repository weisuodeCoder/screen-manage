import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '分组id',
    align:"center",
    dataIndex: 'groupId'
   },
   {
    title: '班级',
    align:"center",
    dataIndex: 'className'
   },
   {
    title: '数值',
    align:"center",
    dataIndex: 'value'
   },
   {
    title: '单位',
    align:"center",
    dataIndex: 'unit'
   },
   {
    title: '日期',
    align:"center",
    dataIndex: 'year',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '分组id',
    field: 'groupId',
    component: 'Input',
  },
  {
    label: '班级',
    field: 'className',
    component: 'Input',
  },
  {
    label: '数值',
    field: 'value',
    component: 'InputNumber',
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: '日期',
    field: 'year',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];

// 高级查询数据
export const superQuerySchema = {
  groupId: {title: '分组id',order: 0,view: 'text', type: 'string',},
  className: {title: '班级',order: 1,view: 'text', type: 'string',},
  value: {title: '数值',order: 2,view: 'number', type: 'number',},
  unit: {title: '单位',order: 3,view: 'text', type: 'string',},
  year: {title: '日期',order: 4,view: 'date', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}