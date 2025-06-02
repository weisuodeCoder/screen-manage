package org.jeecg.modules.demo.leftTwoMain.controller;

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
import org.jeecg.modules.demo.leftTwoMain.entity.ScreenLeftTwoMain;
import org.jeecg.modules.demo.leftTwoMain.service.IScreenLeftTwoMainService;

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

 /**
 * @Description: 左二分组
 * @Author: jeecg-boot
 * @Date:   2025-06-02
 * @Version: V1.0
 */
@Tag(name="左二分组")
@RestController
@RequestMapping("/leftTwoMain/screenLeftTwoMain")
@Slf4j
public class ScreenLeftTwoMainController extends JeecgController<ScreenLeftTwoMain, IScreenLeftTwoMainService> {
	@Autowired
	private IScreenLeftTwoMainService screenLeftTwoMainService;
	
	/**
	 * 分页列表查询
	 *
	 * @param screenLeftTwoMain
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "左二分组-分页列表查询")
	@Operation(summary="左二分组-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<ScreenLeftTwoMain>> queryPageList(ScreenLeftTwoMain screenLeftTwoMain,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
        QueryWrapper<ScreenLeftTwoMain> queryWrapper = QueryGenerator.initQueryWrapper(screenLeftTwoMain, req.getParameterMap());
		Page<ScreenLeftTwoMain> page = new Page<ScreenLeftTwoMain>(pageNo, pageSize);
		IPage<ScreenLeftTwoMain> pageList = screenLeftTwoMainService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param screenLeftTwoMain
	 * @return
	 */
	@AutoLog(value = "左二分组-添加")
	@Operation(summary="左二分组-添加")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ScreenLeftTwoMain screenLeftTwoMain) {
		screenLeftTwoMainService.save(screenLeftTwoMain);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param screenLeftTwoMain
	 * @return
	 */
	@AutoLog(value = "左二分组-编辑")
	@Operation(summary="左二分组-编辑")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ScreenLeftTwoMain screenLeftTwoMain) {
		screenLeftTwoMainService.updateById(screenLeftTwoMain);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "左二分组-通过id删除")
	@Operation(summary="左二分组-通过id删除")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		screenLeftTwoMainService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "左二分组-批量删除")
	@Operation(summary="左二分组-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.screenLeftTwoMainService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "左二分组-通过id查询")
	@Operation(summary="左二分组-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ScreenLeftTwoMain> queryById(@RequestParam(name="id",required=true) String id) {
		ScreenLeftTwoMain screenLeftTwoMain = screenLeftTwoMainService.getById(id);
		if(screenLeftTwoMain==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(screenLeftTwoMain);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param screenLeftTwoMain
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScreenLeftTwoMain screenLeftTwoMain) {
        return super.exportXls(request, screenLeftTwoMain, ScreenLeftTwoMain.class, "左二分组");
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
        return super.importExcel(request, response, ScreenLeftTwoMain.class);
    }

}
