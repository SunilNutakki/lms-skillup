
package com.lmsskillup.controller;

import com.lmsskillup.dto.ModuleRequest;
import com.lmsskillup.dto.ModuleResponse;
import com.lmsskillup.service.ModuleService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final ModuleService moduleService;

    // Constructor injection
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    // 1. Create Module
    // POST http://localhost:8081/api/modules
    @PostMapping
    public ResponseEntity<ModuleResponse> createModule(
            @RequestBody ModuleRequest request) {

        ModuleResponse response =
                moduleService.createModule(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    
 // 2. Get all modules by course ID
 // GET /api/modules/course/1
 @GetMapping("/course/{courseId}")
 public ResponseEntity<List<ModuleResponse>> getModulesByCourseId(
         @PathVariable Long courseId) {

     List<ModuleResponse> response =
             moduleService.getModulesByCourseId(courseId);

     return ResponseEntity.ok(response);
 }
}
