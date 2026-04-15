using System;
using System.Collections;
using UnityEngine;
using UnityEngine.InputSystem;
using Random = UnityEngine.Random;

namespace DefaultNamespace
{
    public class Buldozer : MonoBehaviour
    {
        [SerializeField] private int brushSize = 20;
        [SerializeField] private float rotationNoiseFactor = 0.1f;
        [SerializeField] private float speed = 1;
        [SerializeField] private float angularSpeed = 1;
        [SerializeField] private GameObject escape;
        private Vector3 _direction = Vector3.forward;
        private float _speed = 0;
        private float _angularSpeed = 0;

        private PlayerInput _input;
        PaintLayer _paintLayer;

        private Transform _model;

        private void Awake()
        {
            _input = GetComponent<PlayerInput>();
            _paintLayer = FindFirstObjectByType<PaintLayer>();
            _input.actions["Restart"].performed += _ => Game.RestartGame();
            _input.actions["End"].performed += HandleEscape;
            _input.actions["Quit"].performed += _ =>
            {
                if (!Application.isEditor) Application.Quit();
            };
            _input.actions["Bot"].performed += _ =>
                FindFirstObjectByType<Game>().AddBot();
            _model = transform.Find("Model");
        }

        private void HandleEscape(InputAction.CallbackContext callbackContext)
        {
            escape.SetActive(!escape.activeSelf);
        }

        private void Update()
        {
            var input = _input.actions["Move"].ReadValue<Vector2>();
            _angularSpeed = input.x;
            _speed = input.y;

            if (!Mathf.Approximately(_angularSpeed, 0))
            {
                var quaternion = Quaternion.AngleAxis(_angularSpeed * angularSpeed, Vector3.up);
                _direction = quaternion * _direction;
            }

            var position = new Vector2(
                               transform.position.x,
                               transform.position.z
                           ) / 30 +
                           Vector2.one / 2;
            _paintLayer.Paint(position, new Color(0, 0, 0, 0), brushSize);

            var lookRotation = Quaternion.LookRotation(_direction, Vector3.up);
            var noiseRotation = Random.rotation;

            var rotation = Quaternion.Lerp(lookRotation, noiseRotation, rotationNoiseFactor);
            _model.rotation = rotation;
        }

        private void FixedUpdate()
        {
            transform.Translate(_direction * (_speed * (speed * Time.deltaTime)));
        }
    }
}