using System;
using UnityEngine;
using UnityEngine.InputSystem;

namespace DefaultNamespace
{
    public class Buldozer : MonoBehaviour
    {
        [SerializeField] private int brushSize = 20;
        [SerializeField] private float speed = 1;
        [SerializeField] private float angularSpeed = 1;

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
            _model = transform.Find("Model");
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
            _model.LookAt(transform.position + _direction);
        }

        private void FixedUpdate()
        {
            transform.Translate(_direction * (_speed * (speed * Time.deltaTime)));
        }
    }
}