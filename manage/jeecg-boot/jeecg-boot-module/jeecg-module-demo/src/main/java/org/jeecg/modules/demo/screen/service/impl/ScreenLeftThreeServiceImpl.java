package org.jeecg.modules.demo.screen.service.impl;

import lombok.RequiredArgsConstructor;
import org.jeecg.modules.demo.screen.entity.*;
import org.jeecg.modules.demo.screen.mapper.ScreenLeftThreeMapper;
import org.jeecg.modules.demo.screen.service.IScreenLeftThreeService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Service
@RequiredArgsConstructor
public class ScreenLeftThreeServiceImpl implements IScreenLeftThreeService {
    private final ScreenLeftThreeMapper screenLeftThreeMapper;

    @Override
    public ScreenLeftThree getLeftThreeDatas(String timeRange) {
        // '36', '12', 'currentYear'
        ScreenLeftThree screenLeftThree = new ScreenLeftThree();
        List<ScreenLeftThreeX> screenLeftThreeXES = screenLeftThreeMapper.selectScreenLeftThreeX(timeRange);
        List<ScreenLeftThreeY> screenLeftThreeYS =  screenLeftThreeMapper.selectScreenLeftThreeY(timeRange);
        screenLeftThree.setScreenLeftThreeXES(screenLeftThreeXES);
        screenLeftThree.setScreenLeftThreeYS(screenLeftThreeYS);

        return screenLeftThree;
    }
}
