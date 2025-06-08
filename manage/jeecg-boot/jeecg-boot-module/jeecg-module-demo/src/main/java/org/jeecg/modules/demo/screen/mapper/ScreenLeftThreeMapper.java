package org.jeecg.modules.demo.screen.mapper;

import org.apache.ibatis.annotations.Mapper;
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
    List<ScreenLeftThreeX> selectScreenLeftThreeX_1();
    List<ScreenLeftThreeX> selectScreenLeftThreeX_2();
    List<ScreenLeftThreeX> selectScreenLeftThreeX_3();

    List<ScreenLeftThreeY> selectScreenLeftThreeY_1();
    List<ScreenLeftThreeY> selectScreenLeftThreeY_2();
    List<ScreenLeftThreeY> selectScreenLeftThreeY_3();
}