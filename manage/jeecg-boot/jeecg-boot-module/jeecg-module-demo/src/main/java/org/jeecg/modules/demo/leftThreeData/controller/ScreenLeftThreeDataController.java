package org.jeecg.modules.demo.leftThreeData.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.system.query.QueryRuleEnum;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.demo.leftThreeData.entity.ScreenLeftThreeData;
import org.jeecg.modules.demo.leftThreeData.service.IScreenLeftThreeDataService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.def.NormalExcelConstants;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView;
import org.jeecg.common.system.base.controller.JeecgController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSON;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.jeecg.common.aspect.annotation.AutoLog;
import org.apache.shiro.authz.annotation.RequiresPermissions;

 /**
 * @Description: 左三数据
 * @Author: jeecg-boot
 * @Date:   2025-06-07
 * @Version: V1.0
 */
@Tag(name="左三数据")
@RestController
@RequestMapping("/leftThreeData/screenLeftThreeData")
@Slf4j
public class ScreenLeftThreeDataController extends JeecgController<ScreenLeftThreeData, IScreenLeftThreeDataService> {
	@Autowired
	private IScreenLeftThreeDataService screenLeftThreeDataService;
	
	/**
	 * 分页列表查询
	 *
	 * @param screenLeftThreeData
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "左三数据-分页列表查询")
	@Operation(summary="左三数据-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<ScreenLeftThreeData>> queryPageList(ScreenLeftThreeData screenLeftThreeData,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
        // 自定义查询规则
        Map<String, QueryRuleEnum> customeRuleMap = new HashMap<>();
        // 自定义多选的查询规则为：LIKE_WITH_OR
        customeRuleMap.put("groupId", QueryRuleEnum.LIKE_WITH_OR);
        QueryWrapper<ScreenLeftThreeData> queryWrapper = QueryGenerator.initQueryWrapper(screenLeftThreeData, req.getParameterMap(),customeRuleMap);
		Page<ScreenLeftThreeData> page = new Page<ScreenLeftThreeData>(pageNo, pageSize);
		IPage<ScreenLeftThreeData> pageList = screenLeftThreeDataService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param screenLeftThreeData
	 * @return
	 */
	@AutoLog(value = "左三数据-添加")
	@Operation(summary="左三数据-添加")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ScreenLeftThreeData screenLeftThreeData) {
		screenLeftThreeDataService.save(screenLeftThreeData);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param screenLeftThreeData
	 * @return
	 */
	@AutoLog(value = "左三数据-编辑")
	@Operation(summary="左三数据-编辑")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ScreenLeftThreeData screenLeftThreeData) {
		screenLeftThreeDataService.updateById(screenLeftThreeData);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "左三数据-通过id删除")
	@Operation(summary="左三数据-通过id删除")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		screenLeftThreeDataService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "左三数据-批量删除")
	@Operation(summary="左三数据-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.screenLeftThreeDataService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "左三数据-通过id查询")
	@Operation(summary="左三数据-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ScreenLeftThreeData> queryById(@RequestParam(name="id",required=true) String id) {
		ScreenLeftThreeData screenLeftThreeData = screenLeftThreeDataService.getById(id);
		if(screenLeftThreeData==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(screenLeftThreeData);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param screenLeftThreeData
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScreenLeftThreeData screenLeftThreeData) {
        return super.exportXls(request, screenLeftThreeData, ScreenLeftThreeData.class, "左三数据");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, ScreenLeftThreeData.class);
    }

}
