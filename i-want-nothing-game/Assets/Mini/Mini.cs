using System;
using DefaultNamespace;
using UnityEngine;

public class Mini : MonoBehaviour
{
    public event Action<Mini> Destroyed;

    [SerializeField] private int brushSize = 10;
    [SerializeField] private float collisionDistanceFactor = .33f;
    [SerializeField] private float speed = 1;
    [SerializeField] private float angularSpeed = 1;

    private Vector3 _direction = Vector3.forward;
    private Color _color;

    private MeshRenderer _faceRenderer;

    private PaintLayer _paintLayer;

    private GameObject _collisionMarker;

    private bool _isSafe;
    private float _safeTimeout;

    private void Awake()
    {
        _faceRenderer = GetComponentInChildren<MeshRenderer>();
        _paintLayer = FindFirstObjectByType<PaintLayer>();
        _collisionMarker = transform.Find("Collision").gameObject;
    }

    private void FixedUpdate()
    {
        transform.Translate(speed * _direction);
        var uvPosition = new Vector2(transform.position.x, transform.position.z) / 30 + Vector2.one / 2;
        _paintLayer.Paint(uvPosition, _color, 10);
    }

    private void Update()
    {
        if ((_safeTimeout -= Time.deltaTime) <= 0) _isSafe = false;

        _collisionMarker.transform.localPosition = collisionDistanceFactor * _direction;

        var uv = new Vector2(
                     _collisionMarker.transform.position.x,
                     _collisionMarker.transform.position.z
                 ) / 30 +
                 Vector2.one / 2;
        var collides = _paintLayer.GetCollision(uv.x, uv.y);
        // if (collides && !_isSafe) Destroy();
    }


    public void Rotate(bool left = false, bool right = false)
    {
        var modifier = (left ? -1 : 0) + (right ? 1 : 0);
        var quaternion = Quaternion.AngleAxis(modifier * angularSpeed, Vector3.up);
        _direction = quaternion * _direction;
    }

    public void Go()
    {
        // TODO: Set spawn point
        _isSafe = true;
        _safeTimeout = 2f;
    }

    public void SetColor(Color color)
    {
        _faceRenderer.material.color = color;
        _color = color;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (!other.gameObject.CompareTag("Wall") && !other.gameObject.CompareTag("Player")) return;

        Destroy();
    }

    public void Destroy()
    {
        // gameObject.SetActive(false);
        Destroyed?.Invoke(this);
    }
}