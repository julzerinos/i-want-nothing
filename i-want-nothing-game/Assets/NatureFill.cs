using System;
using DefaultNamespace;
using UnityEngine;
using UnityEngine.UI;

public class NatureFill : MonoBehaviour
{
    PaintLayer paintLayer;

    private Image _image;
    
    private void Awake()
    {
        paintLayer = FindFirstObjectByType<PaintLayer>();
        _image = GetComponent<Image>();
    }

    private void Update()
    {
        _image.fillAmount = paintLayer.fillRatio;
    }
}
