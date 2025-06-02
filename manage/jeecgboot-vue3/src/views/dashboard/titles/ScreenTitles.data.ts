import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '位置',
    align:"center",
    dataIndex: 'sort_dictText'
   },
   {
    title: '主标题',
    align:"center",
    dataIndex: 'title'
   },
   {
    title: '副标题',
    align:"center",
    dataIndex: 'subTitle'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '位置',
    field: 'sort',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"screen_pos"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入位置!'},
          ];
     },
  },
  {
    label: '主标题',
    field: 'title',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入主标题!'},
          ];
     },
  },
  {
    label: '副标题',
    field: 'subTitle',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入副标题!'},
          ];
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
  sort: {title: '位置',order: 0,view: 'list', type: 'string',dictCode: 'screen_pos',},
  title: {title: '主标题',order: 1,view: 'text', type: 'string',},
  subTitle: {title: '副标题',order: 2,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}