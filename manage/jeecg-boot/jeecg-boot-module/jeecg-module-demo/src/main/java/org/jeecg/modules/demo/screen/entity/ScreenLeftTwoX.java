package org.jeecg.modules.demo.screen.entity;


import lombok.Data;

import java.util.List;

@Data
public class ScreenLeftOne {
    private String id;
    private String title;
    private String unit;
    private List<ChartData> datas;

    @Data
    public static class ChartData {
        private String name;
        private String unit;
        private Integer value;
        private ItemStyle itemStyle;
    }

    @Data
    public static class ItemStyle {
        private List<String> colors;
    }
}