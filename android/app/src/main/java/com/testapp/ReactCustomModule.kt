package com.testapp

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.telephony.TelephonyManager
import androidx.core.content.ContextCompat
import androidx.annotation.NonNull
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod

class ReactCustomModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    companion object {
        lateinit var reactContext: ReactApplicationContext
    }

    init {
        reactContext = context
    }

    override fun getName(): String {
        return "ReactCustomModule"
    }

    @ReactMethod
    fun getSIMPhoneNumber(response: Promise) {
       try {
        if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED) {
            // Permission granted, proceed with retrieving SIM phone number
            val telephonyManager = reactContext.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
            val phoneNumber = telephonyManager.line1Number ?: "Phone number not available"
          response.resolve(phoneNumber)
        } else {
            // Permission denied, reject the promise with an appropriate message
            response.reject("Permission Error", "READ_PHONE_STATE permission not granted")
        }
    } catch (e: Exception) {
        response.reject("Error", e)
    }
    }
}
