package org.jeecg.modules.demo.rightTwoData.controller;

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
import org.jeecg.modules.demo.rightTwoData.entity.ScreenRightTwoData;
import org.jeecg.modules.demo.rightTwoData.service.IScreenRightTwoDataService;

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
 * @Description: 右二数据
 * @Author: jeecg-boot
 * @Date:   2025-06-07
 * @Version: V1.0
 */
@Tag(name="右二数据")
@RestController
@RequestMapping("/rightTwoData/screenRightTwoData")
@Slf4j
public class ScreenRightTwoDataController extends JeecgController<ScreenRightTwoData, IScreenRightTwoDataService> {
	@Autowired
	private IScreenRightTwoDataService screenRightTwoDataService;
	
	/**
	 * 分页列表查询
	 *
	 * @param screenRightTwoData
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "右二数据-分页列表查询")
	@Operation(summary="右二数据-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<ScreenRightTwoData>> queryPageList(ScreenRightTwoData screenRightTwoData,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
        QueryWrapper<ScreenRightTwoData> queryWrapper = QueryGenerator.initQueryWrapper(screenRightTwoData, req.getParameterMap());
		Page<ScreenRightTwoData> page = new Page<ScreenRightTwoData>(pageNo, pageSize);
		IPage<ScreenRightTwoData> pageList = screenRightTwoDataService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param screenRightTwoData
	 * @return
	 */
	@AutoLog(value = "右二数据-添加")
	@Operation(summary="右二数据-添加")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ScreenRightTwoData screenRightTwoData) {
		screenRightTwoDataService.save(screenRightTwoData);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param screenRightTwoData
	 * @return
	 */
	@AutoLog(value = "右二数据-编辑")
	@Operation(summary="右二数据-编辑")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ScreenRightTwoData screenRightTwoData) {
		screenRightTwoDataService.updateById(screenRightTwoData);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "右二数据-通过id删除")
	@Operation(summary="右二数据-通过id删除")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		screenRightTwoDataService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "右二数据-批量删除")
	@Operation(summary="右二数据-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.screenRightTwoDataService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "右二数据-通过id查询")
	@Operation(summary="右二数据-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ScreenRightTwoData> queryById(@RequestParam(name="id",required=true) String id) {
		ScreenRightTwoData screenRightTwoData = screenRightTwoDataService.getById(id);
		if(screenRightTwoData==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(screenRightTwoData);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param screenRightTwoData
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScreenRightTwoData screenRightTwoData) {
        return super.exportXls(request, screenRightTwoData, ScreenRightTwoData.class, "右二数据");
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
        return super.importExcel(request, response, ScreenRightTwoData.class);
    }

}
