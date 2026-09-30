package com.lmsskillup.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardResponse {

    private boolean success;
    private String dashboardId;
    private String dashboardName;
    private String urlPath;
}