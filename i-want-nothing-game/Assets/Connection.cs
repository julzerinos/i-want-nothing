using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DefaultNamespace;
using UnityEngine;
using NativeWebSocket;
using UnityEngine.Networking;

public struct MiniPayload
{
    public bool Left;
    public bool Right;
    public int ID;
}

public class Connection : MonoBehaviour
{
    public event Action Connected;
    public event Action Failed;
    public event Action<MiniPayload> MiniDataReceived;
    public event Action<string> QRCodeReceived;

    [SerializeField] private string wsPath;

    private WebSocket _websocket;

    public async Task Initialize()
    {
        // var request = UnityWebRequest.Get("https://ipv4.icanhazip.com/");
        // request.downloadHandler = new DownloadHandlerBuffer();
        // await request.SendWebRequest();
        // var ip = request.downloadHandler.text;
        var wsUrl = $"ws://localhost:8083/";

        Debug.Log($"Attempting to connect to {wsUrl}");

        _websocket = new WebSocket(wsUrl, new Dictionary<string, string> { { "Client", "Main" } });

        _websocket.OnOpen += OnOpen;
        _websocket.OnError += OnError;
        _websocket.OnClose += OnClose;
        _websocket.OnMessage += OnMessage;

        await _websocket.Connect();
    }

    public void NotifyStart()
    {
        SendCodedMessage(0);
    }

    public void NotifyStop()
    {
        SendCodedMessage(1 << 5);
    }

    private void OnClose(WebSocketCloseCode code)
    {
        Debug.Log($"[Connection] Socket closed because code: {code}.");
        Failed?.Invoke();
    }

    private void OnError(string error)
    {
        Debug.Log($"[Connection] Socket closed because error: {error}.");
        Failed?.Invoke();
    }

    private async void SendCodedMessage(byte data)
    {
        var payload = new byte[1];
        data |= (1 << 7);
        payload[0] = data;
        await _websocket.Send(payload);
    }

    private void OnOpen()
    {
        Debug.Log("[Connection] Opened.");
        Connected?.Invoke();
    }

    private void OnMessage(byte[] payload)
    {
        if (payload.Length == 1)
        {
            var data = payload[0];

            if (data >> 5 == 1)
                MiniDataReceived?.Invoke(new MiniPayload
                {
                    ID = data & 0b0111,
                    Right = (data & 0b1000) > 1,
                    Left = (data & 0b10000) > 1,
                });

            return;
        }

        var qrCode = System.Text.Encoding.Default.GetString(payload);
        QRCodeReceived?.Invoke(qrCode);
    }

    private async void OnApplicationQuit()
    {
        await _websocket.Close();
    }
}