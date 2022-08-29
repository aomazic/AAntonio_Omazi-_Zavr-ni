package com.example.ZavrsniBackend;


import com.example.ZavrsniBackend.model.ArduinoVarijable;
import com.example.ZavrsniBackend.model.UpdateVar;
import com.example.ZavrsniBackend.service.ArduinoVarijableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/ArduinoVarijable")
public class ArduinoVarijableResource {
    @Autowired
    private final ArduinoVarijableService arduinoVarijableService;

    public ArduinoVarijableResource(ArduinoVarijableService arduinoVarijableService) {
        this.arduinoVarijableService = arduinoVarijableService;
    }

    @GetMapping("/get/{name}")
    public ArduinoVarijable getArduinoVarijable(@PathVariable String name) throws ExecutionException, InterruptedException {
        return arduinoVarijableService.getArduinoVarijable(name);

    }

    @PutMapping("/update")
    public String updateArduinoVarijable(@RequestBody UpdateVar updatevar) throws ExecutionException, InterruptedException {
        return arduinoVarijableService.updateArduinoVarijablu(updatevar.getUpdatetarget(), updatevar.getUpdateValue().toString(), updatevar.getDocName());

    }

}




