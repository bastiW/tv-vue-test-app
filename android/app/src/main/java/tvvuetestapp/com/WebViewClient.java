package tvvuetestapp.com;

import android.graphics.Bitmap;
import android.net.Uri;
import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;

import com.getcapacitor.Bridge;

public class WebViewClient extends android.webkit.WebViewClient {

    private Bridge bridge;

    public WebViewClient(Bridge bridge) {
        this.bridge = bridge;
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        return bridge.getLocalServer().shouldInterceptRequest(request);
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        Uri url = request.getUrl();
        return bridge.launchIntent(url);
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        return bridge.launchIntent(Uri.parse(url));
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);

        view.loadUrl("javascript:document.body.style.zoom = "+ String.valueOf(getScale(view))+";");

    }

    private double getScale(View view) {
        return (view.getHeight() / (double) view.getWidth());
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        super.onPageStarted(view, url, favicon);
        bridge.reset();
    }
}
