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
    dataIndex: 'groupId_dictText'
   },
   {
    title: '日期',
    align:"center",
    dataIndex: 'time',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
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
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "分组id",
      field: 'groupId',
      component: 'JSelectMultiple',
      componentProps:{
          dictCode:"screen_left_three_main,title,id"
      },
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '分组id',
    field: 'groupId',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"screen_left_three_main,title,id"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入分组id!'},
          ];
     },
  },
  {
    label: '日期',
    field: 'time',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入日期!'},
          ];
     },
  },
  {
    label: '数值',
    field: 'value',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入数值!'},
          ];
     },
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
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
  groupId: {title: '分组id',order: 0,view: 'list', type: 'string',dictTable: "screen_left_three_main", dictCode: 'id', dictText: 'title',},
  time: {title: '日期',order: 1,view: 'date', type: 'string',},
  value: {title: '数值',order: 2,view: 'number', type: 'number',},
  unit: {title: '单位',order: 3,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}