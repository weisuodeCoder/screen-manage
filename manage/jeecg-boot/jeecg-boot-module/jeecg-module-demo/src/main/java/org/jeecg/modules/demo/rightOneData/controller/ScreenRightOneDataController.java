package org.jeecg.modules.demo.rightOneData.controller;

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
import org.jeecg.modules.demo.rightOneData.entity.ScreenRightOneData;
import org.jeecg.modules.demo.rightOneData.service.IScreenRightOneDataService;

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
 * @Description: 右一数据
 * @Author: jeecg-boot
 * @Date:   2025-06-07
 * @Version: V1.0
 */
@Tag(name="右一数据")
@RestController
@RequestMapping("/rightOneData/screenRightOneData")
@Slf4j
public class ScreenRightOneDataController extends JeecgController<ScreenRightOneData, IScreenRightOneDataService> {
	@Autowired
	private IScreenRightOneDataService screenRightOneDataService;
	
	/**
	 * 分页列表查询
	 *
	 * @param screenRightOneData
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "右一数据-分页列表查询")
	@Operation(summary="右一数据-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<ScreenRightOneData>> queryPageList(ScreenRightOneData screenRightOneData,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
        // 自定义查询规则
        Map<String, QueryRuleEnum> customeRuleMap = new HashMap<>();
        // 自定义多选的查询规则为：LIKE_WITH_OR
        customeRuleMap.put("groupId", QueryRuleEnum.LIKE_WITH_OR);
        QueryWrapper<ScreenRightOneData> queryWrapper = QueryGenerator.initQueryWrapper(screenRightOneData, req.getParameterMap(),customeRuleMap);
		Page<ScreenRightOneData> page = new Page<ScreenRightOneData>(pageNo, pageSize);
		IPage<ScreenRightOneData> pageList = screenRightOneDataService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param screenRightOneData
	 * @return
	 */
	@AutoLog(value = "右一数据-添加")
	@Operation(summary="右一数据-添加")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ScreenRightOneData screenRightOneData) {
		screenRightOneDataService.save(screenRightOneData);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param screenRightOneData
	 * @return
	 */
	@AutoLog(value = "右一数据-编辑")
	@Operation(summary="右一数据-编辑")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ScreenRightOneData screenRightOneData) {
		screenRightOneDataService.updateById(screenRightOneData);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "右一数据-通过id删除")
	@Operation(summary="右一数据-通过id删除")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		screenRightOneDataService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "右一数据-批量删除")
	@Operation(summary="右一数据-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.screenRightOneDataService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "右一数据-通过id查询")
	@Operation(summary="右一数据-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ScreenRightOneData> queryById(@RequestParam(name="id",required=true) String id) {
		ScreenRightOneData screenRightOneData = screenRightOneDataService.getById(id);
		if(screenRightOneData==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(screenRightOneData);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param screenRightOneData
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScreenRightOneData screenRightOneData) {
        return super.exportXls(request, screenRightOneData, ScreenRightOneData.class, "右一数据");
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
        return super.importExcel(request, response, ScreenRightOneData.class);
    }

}
