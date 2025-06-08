package org.jeecg.modules.demo.screen.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.jeecg.modules.demo.screen.entity.ScreenLeftOne;
import org.jeecg.modules.demo.screen.mapper.ScreenLeftOneMapper;
import org.jeecg.modules.demo.screen.service.IScreenLeftOneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Service
@RequiredArgsConstructor
public class ScreenLeftOneServiceImpl implements IScreenLeftOneService {
    private final  ScreenLeftOneMapper screenLeftOneMapper;
    private final ObjectMapper objectMapper; // Jackson的ObjectMapper

    @Override
    public List<ScreenLeftOne> getLeftOneDatas() {
        List<Map<String, Object>> rawData  = screenLeftOneMapper.selectScreenLeftOne();
        return rawData.stream()
                .map(this::convertToPieChartDTO)
                .collect(Collectors.toList());
    }

    private ScreenLeftOne convertToPieChartDTO(Map<String, Object> rawMap) {
        ScreenLeftOne dto = new ScreenLeftOne();
        dto.setId((String) rawMap.get("id"));
        dto.setTitle((String) rawMap.get("title"));
        dto.setUnit((String) rawMap.get("unit"));

        try {
            String datasJson = (String) rawMap.get("datas");
            List<ScreenLeftOne.ChartData> chartDatas = objectMapper.readValue(
                    datasJson,
                    new TypeReference<List<ScreenLeftOne.ChartData>>() {}
            );
            dto.setDatas(chartDatas);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse datas JSON", e);
        }

        return dto;
    }
}
