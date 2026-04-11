using System;
using DefaultNamespace;
using UnityEngine;

public class Mini : MonoBehaviour
{
    public event Action<Mini> Destroyed;

    [SerializeField] private float speed = 1;
    [SerializeField] private float angularSpeed = 1;

    private Vector3 _direction = Vector3.forward;
    private Color _color;

    private MeshRenderer _faceRenderer;

    private PaintLayer _paintLayer;

    private GameObject _collisionMarker;

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
        _paintLayer.Paint(uvPosition, _color);
    }

    private void Update()
    {
        _collisionMarker.transform.localPosition = _direction;

        var uv = new Vector2(
                     _collisionMarker.transform.position.x,
                     _collisionMarker.transform.position.z
                 ) / 30 +
                 Vector2.one / 2;
        var collides = _paintLayer._drawZone.GetCollision(uv.x, uv.y);
        if (collides) Debug.Log("Would destroy");
    }

    public void Rotate(bool left = false, bool right = false)
    {
        var modifier = (left ? -1 : 0) + (right ? 1 : 0);
        var quaternion = Quaternion.AngleAxis(modifier * angularSpeed, Vector3.up);
        _direction = quaternion * _direction;
    }

    public void SetColor(Color color)
    {
        _faceRenderer.material.color = color;
        _color = color;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (!other.gameObject.CompareTag("Wall")) return;

        Destroy();
    }

    public void Destroy()
    {
        // gameObject.SetActive(false);
        Destroyed?.Invoke(this);
    }
}