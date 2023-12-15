package com.reteno.sample;

import android.app.Application;

import androidx.annotation.NonNull;

import com.reteno.core.Reteno;
import com.reteno.core.RetenoImpl;
import com.reteno.plugin.CordovaRetenoApplication;

public class MainApplication extends Application implements CordovaRetenoApplication {

    private Reteno retenoInstance=null;

    @Override
    public void onCreate() {
        super.onCreate();
        retenoInstance = new RetenoImpl(this, "YOUR_API_KEY");
    }

    @NonNull
    @Override
    public Reteno getRetenoInstance() {
        return retenoInstance;
    }

}
