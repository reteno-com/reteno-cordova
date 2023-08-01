package com.reteno.sample;

import android.app.Application;

import androidx.annotation.NonNull;

import com.reteno.core.Reteno;
import com.reteno.core.RetenoImpl;
import com.reteno.plugin.CordovaRetenoApplication;

public class MainApplication extends Application implements CordovaRetenoApplication {
    private String key=null;
    private Reteno retenoInstance=null;
    @NonNull
    @Override
    public Reteno getRetenoInstance() {
        return retenoInstance;
    }

    @Override
    public void initReteno(String key) {
        this.key = key;
        if (retenoInstance==null && key!=null)
            retenoInstance = new RetenoImpl(this, key);
    }
}
