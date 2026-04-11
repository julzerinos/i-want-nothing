using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace DefaultNamespace
{
    public class Game : MonoBehaviour
    {
        [SerializeField] private Mini miniPrefab;

        private readonly Dictionary<int, Mini> _minis = new();

        private async void Awake()
        {
            Application.runInBackground = true;

            var connection = FindFirstObjectByType<Connection>();
            connection.Connected += OnConnected;
            connection.MiniDataReceived += OnMiniDataReceived;
            await connection.Initialize();
        }

        private void OnConnected()
        {
        }

        private void OnMiniDataReceived(MiniPayload payload)
        {
            if (!_minis.TryGetValue(payload.ID, out var mini))
                mini = SpawnMini(payload.ID);

            mini.Rotate(payload.Left, payload.Right);
        }

        private void OnMiniDestroyed(Mini mini)
        {
            mini.transform.position = Vector3.zero;
            // mini.gameObject.SetActive(true);
            mini.Go();
        }

        private Mini SpawnMini(int id)
        {
            var mini = Instantiate(miniPrefab);
            mini.SetColor(Colors[_minis.Count]);
            mini.Destroyed += OnMiniDestroyed;
            _minis.Add(id, mini);
            mini.Go();
            return mini;
        }

        public static void RestartGame()
        {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }

        private static readonly Color[] Colors =
        {
            Color.red,
            Color.blue,
            Color.black,
            Color.green,
            Color.magenta,
            Color.yellow,
            Color.purple,
            Color.brown
        };
    }
}