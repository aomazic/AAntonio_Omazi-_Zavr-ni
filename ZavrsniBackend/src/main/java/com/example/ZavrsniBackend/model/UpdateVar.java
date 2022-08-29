package com.example.ZavrsniBackend.model;

public class UpdateVar {
    private String docName;
    private String updatetarget;
    private Integer updateValue;

    public UpdateVar() {
    }

    public UpdateVar(String docName, String updatetarget, Integer updateValue) {
        this.docName = docName;
        this.updatetarget = updatetarget;
        this.updateValue = updateValue;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getUpdatetarget() {
        return updatetarget;
    }

    public void setUpdatetarget(String updatetarget) {
        this.updatetarget = updatetarget;
    }

    public Integer getUpdateValue() {
        return updateValue;
    }

    public void setUpdateValue(Integer updateValue) {
        this.updateValue = updateValue;
    }
}







