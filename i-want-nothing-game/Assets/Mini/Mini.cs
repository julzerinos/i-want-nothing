using System;
using DefaultNamespace;
using UnityEngine;
using Random = UnityEngine.Random;

public class Mini : MonoBehaviour
{
    public event Action<Mini> Destroyed;

    [SerializeField] private int brushSize = 10;
    [SerializeField] private float collisionDistanceFactor = .33f;
    [SerializeField] private float speed = 1;
    [SerializeField] private float angularSpeed = 1;

    private Vector3 _direction = Vector3.forward;
    private MiniTheme _theme;

    private MeshRenderer _faceRenderer;

    private PaintLayer _paintLayer;

    private GameObject _collisionMarker;

    private bool _isSafe;
    private float _safeTimeout;
    private ParticleSystemRenderer _particleSystemRenderer;
    private ParticleSystem _particleSystem;

    private void Awake()
    {
        _faceRenderer = GetComponentInChildren<MeshRenderer>();
        _paintLayer = FindFirstObjectByType<PaintLayer>();
        _collisionMarker = transform.Find("Collision").gameObject;
        _particleSystemRenderer = GetComponentInChildren<ParticleSystemRenderer>();
        _particleSystem = GetComponentInChildren<ParticleSystem>();
    }

    private void Start()
    {
        var buldozer = FindFirstObjectByType<Buldozer>().GetComponentInChildren<Collider>();
        _particleSystem.trigger.AddCollider(buldozer);
    }

    private void FixedUpdate()
    {
        transform.Translate(speed * _direction);
        var uvPosition = new Vector2(transform.position.x, transform.position.z) / 30 + Vector2.one / 2;
        _paintLayer.Paint(uvPosition, _theme.color, 10);
    }

    private void Update()
    {
        if ((_safeTimeout -= Time.deltaTime) <= 0) _isSafe = false;

        _collisionMarker.transform.localPosition = collisionDistanceFactor * _direction;

        // var uv = new Vector2(
        //              _collisionMarker.transform.position.x,
        //              _collisionMarker.transform.position.z
        //          ) / 30 +
        //          Vector2.one / 2;
        // var collides = _paintLayer.GetCollision(uv.x, uv.y);
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
        var onCircle = Random.onUnitCircle;
        _particleSystemRenderer.transform.SetParent(transform, false);
        _particleSystem.Play();
        _direction = new Vector3(onCircle.x, 0, onCircle.y);
        _isSafe = true;
        _safeTimeout = .5f;
    }

    public void SetTheme(MiniTheme theme)
    {
        _faceRenderer.material.color = theme.color;
        _theme = theme;
        // _particleSystemRenderer.material.mainTexture = theme.texture;
        
        _particleSystemRenderer.material.color = theme.color;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (!other.gameObject.CompareTag("Wall") && !other.gameObject.CompareTag("Player")) return;

        Destroy();
    }

    public void Destroy()
    {
        _particleSystemRenderer.transform.SetParent(null, false);
        _particleSystem.Stop();
        Destroyed?.Invoke(this);
    }
}