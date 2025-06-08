package org.jeecg.modules.demo.leftOneData.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.system.query.QueryRuleEnum;
import org.jeecg.modules.demo.leftOneData.entity.ScreenLeftOneData;
import org.jeecg.modules.demo.leftOneData.service.IScreenLeftOneDataService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecg.common.system.base.controller.JeecgController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.jeecg.common.aspect.annotation.AutoLog;

 /**
 * @Description: 左一数据
 * @Author: jeecg-boot
 * @Date:   2025-06-07
 * @Version: V1.0
 */
@Tag(name="左一数据")
@RestController
@RequestMapping("/leftOneData/screenLeftOneData")
@Slf4j
public class ScreenLeftOneDataController extends JeecgController<ScreenLeftOneData, IScreenLeftOneDataService> {
	@Autowired
	private IScreenLeftOneDataService screenLeftOneDataService;
	
	/**
	 * 分页列表查询
	 *
	 * @param screenLeftOneData
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "左一数据-分页列表查询")
	@Operation(summary="左一数据-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<ScreenLeftOneData>> queryPageList(ScreenLeftOneData screenLeftOneData,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
        // 自定义查询规则
        Map<String, QueryRuleEnum> customeRuleMap = new HashMap<>();
        // 自定义多选的查询规则为：LIKE_WITH_OR
        customeRuleMap.put("groupId", QueryRuleEnum.LIKE_WITH_OR);
        QueryWrapper<ScreenLeftOneData> queryWrapper = QueryGenerator.initQueryWrapper(screenLeftOneData, req.getParameterMap(),customeRuleMap);
		Page<ScreenLeftOneData> page = new Page<ScreenLeftOneData>(pageNo, pageSize);
		IPage<ScreenLeftOneData> pageList = screenLeftOneDataService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param screenLeftOneData
	 * @return
	 */
	@AutoLog(value = "左一数据-添加")
	@Operation(summary="左一数据-添加")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ScreenLeftOneData screenLeftOneData) {
		screenLeftOneDataService.save(screenLeftOneData);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param screenLeftOneData
	 * @return
	 */
	@AutoLog(value = "左一数据-编辑")
	@Operation(summary="左一数据-编辑")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ScreenLeftOneData screenLeftOneData) {
		screenLeftOneDataService.updateById(screenLeftOneData);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "左一数据-通过id删除")
	@Operation(summary="左一数据-通过id删除")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		screenLeftOneDataService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "左一数据-批量删除")
	@Operation(summary="左一数据-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.screenLeftOneDataService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "左一数据-通过id查询")
	@Operation(summary="左一数据-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ScreenLeftOneData> queryById(@RequestParam(name="id",required=true) String id) {
		ScreenLeftOneData screenLeftOneData = screenLeftOneDataService.getById(id);
		if(screenLeftOneData==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(screenLeftOneData);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param screenLeftOneData
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScreenLeftOneData screenLeftOneData) {
        return super.exportXls(request, screenLeftOneData, ScreenLeftOneData.class, "左一数据");
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
        return super.importExcel(request, response, ScreenLeftOneData.class);
    }

}
