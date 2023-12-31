package org.apache.cordova.firebase;

import android.os.Bundle;

import com.google.firebase.messaging.RemoteMessage;
import com.reteno.fcm.RetenoFirebaseMessagingService;

public abstract class FirebasePluginMessageReceiver {

    public FirebasePluginMessageReceiver() {
        FirebasePluginMessageReceiverManager.register(this);
    }

    /**
     * Concrete subclasses should override this and return true if they handle the received message.
     *
     * @param remoteMessage
     * @return true if the received message was handled by the receiver so should not be handled by FirebasePluginMessagingService.onMessageReceived()
     */
    public abstract boolean onMessageReceived(RemoteMessage remoteMessage);

    /**
     * Concrete subclasses should override this and return true if they handle the message bundle before it's sent to FirebasePlugin.sendMessage().
     *
     * @param bundle
     * @return true if the received bundle was handled by the receiver so should not be handled by FirebasePlugin.
     */
    public abstract boolean sendMessage(Bundle bundle);
}
