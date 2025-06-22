package org.jeecg.modules.demo.screen.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.jeecg.modules.demo.screen.entity.ScreenLeftThreeX;
import org.jeecg.modules.demo.screen.entity.ScreenLeftThreeY;

import java.util.List;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Mapper // 添加注解
public interface ScreenLeftThreeMapper {
    List<ScreenLeftThreeX> selectScreenLeftThreeX(@Param("timeRange") String timeRange);
    List<ScreenLeftThreeY> selectScreenLeftThreeY(@Param("timeRange") String timeRange);
}