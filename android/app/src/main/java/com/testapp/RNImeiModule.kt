package com.testapp

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.telephony.TelephonyManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.provider.Settings
import android.util.Log

class RNImeiModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val tm: TelephonyManager = reactContext.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

    override fun getName(): String {
        return "RNImeiModule"
    }

    @SuppressLint("MissingPermission", "HardwareIds")
     @ReactMethod

  
    fun getIMEIDeviceId(context: Context): String {
    var deviceId: String
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        deviceId = Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID)
    } else {
        val mTelephony = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager?
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (context.checkSelfPermission(Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
                return ""
            }
        }
        if (mTelephony?.deviceId != null) {
            deviceId = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                mTelephony.imei
            } else {
                mTelephony.deviceId
            }
        } else {
            deviceId = Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID)
        }
    }
    Log.d("deviceId", deviceId)
    return deviceId
}
    fun getImei(promise: Promise) {
        if (!hasPermission()) {
            promise.reject(RuntimeException("Missing permission " + Manifest.permission.READ_PHONE_STATE))
        } else {
            if (Build.VERSION.SDK_INT >= 23) {
                val count: Int = tm.phoneCount
                val imei = arrayOfNulls<String>(count)
                for (i in 0 until count) {
                    imei[i] = if (Build.VERSION.SDK_INT >= 26) {
                        tm.getImei(i)
                    } else {
                        tm.getDeviceId(i)
                    }
                }
                promise.resolve(Arguments.fromJavaArgs(imei))
            } else {
                promise.resolve(Arguments.fromJavaArgs(arrayOf(tm.deviceId)))
            }
        }
    }

    private fun hasPermission(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            reactApplicationContext.checkSelfPermission(Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED
        } else true
    }
}
