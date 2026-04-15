using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Serialization;
using UnityEngine.UI;
using Random = UnityEngine.Random;

namespace DefaultNamespace
{
    public class Game : MonoBehaviour
    {
        public MiniTheme[] themes;

        [SerializeField] private Mini miniPrefab;

        [SerializeField] private Text _qrCodeText;

        private readonly Dictionary<int, Mini> _minis = new();
        private readonly Dictionary<int, Mini> _minisBots = new();

        private async void Awake()
        {
            Application.runInBackground = true;

            var connection = FindFirstObjectByType<Connection>();
            connection.Connected += OnConnected;
            connection.MiniDataReceived += OnMiniDataReceived;
            connection.QRCodeReceived += OnQRCodeReceived;
            await connection.Initialize();
        }

        // private void Start()
        // {
        //     StartCoroutine(TimerTimer());
        // }
        //
        // private IEnumerator TimerTimer()
        // {
        //     var timeLeft = 180f;
        //     while ((timeLeft -= Time.deltaTime) >= 0)
        //     {
        //         _timerText.text = Mathf.FloorToInt(timeLeft).ToString();
        //         yield return null;
        //     }
        //
        //     RestartGame();
        // }

        private void OnQRCodeReceived(string data)
        {
            _qrCodeText.text = data;
        }

        private void OnConnected() { }

        private void OnMiniDataReceived(MiniPayload payload)
        {
            if (!_minis.TryGetValue(payload.ID, out var mini))
                mini = SpawnMini(payload.ID);

            mini?.Rotate(payload.Left, payload.Right);
        }

        public void AddBot()
        {
            SpawnMini(6 - _minisBots.Count, true);
        }

        private void OnMiniDestroyed(Mini mini)
        {
            mini.gameObject.SetActive(false);
            StartCoroutine(RespawnDelay(mini));
        }

        private IEnumerator RespawnDelay(Mini mini)
        {
            yield return new WaitForSeconds(2.5f);

            mini.gameObject.SetActive(true);
            mini.transform.position = transform.GetChild(Random.Range(0, transform.childCount)).position;
            mini.Go();
        }

        private Mini SpawnMini(int id, bool isBot = false)
        {
            if (_minisBots.Count + _minis.Count >= 7) return null;
            
            var mini = Instantiate(miniPrefab);
            mini.SetTheme(themes[id], isBot);
            mini.Destroyed += OnMiniDestroyed;
            mini.transform.position = transform.GetChild(Random.Range(0, transform.childCount)).position;
            if (isBot)
                _minisBots.Add(id, mini);
            else
                _minis.Add(id, mini);
            mini.Go();
            return mini;
        }

        public static void RestartGame()
        {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }

        // private static readonly Color[] Colors =
        // {
        //     Color.red,
        //     Color.blue,
        //     Color.black,
        //     Color.green,
        //     Color.magenta,
        //     Color.yellow,
        //     Color.purple,
        //     Color.brown
        // };
    }
}