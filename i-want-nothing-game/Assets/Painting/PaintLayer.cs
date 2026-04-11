using System;
using UnityEngine;
using UnityEngine.Rendering;
using Random = UnityEngine.Random;

namespace DefaultNamespace
{
    public class PaintLayer : MonoBehaviour
    {
        public int brushSize = 10;
        public Color brushColor = Color.black;
        public Texture2D brushTexture;
        [Range(0, 1)] public float brushHardness = 1f;

        Material gpuDrawerMaterial;
        [HideInInspector] public DrawZone _drawZone;

        private void Awake()
        {
            gpuDrawerMaterial = new Material(Shader.Find("Custom/Painting"));
            gpuDrawerMaterial.SetTexture("_BrushTexture", brushTexture);
            _drawZone = GetComponent<DrawZone>();
        }

        public void Paint(Vector2 at, Color color)
        {
            gpuDrawerMaterial.SetColor("_BrushColor", color);
            _drawZone.DrawTexture = DrawOnTextureGPU(_drawZone.DrawTexture, at);
            _drawZone.SetCollision(at.x, at.y, true);
        }

        RenderTexture DrawOnTextureGPU(Texture src, Vector2 nrmPos)
        {
            int srcWidth = src.width;

            gpuDrawerMaterial.SetVector("_BrushPosition", nrmPos);
            gpuDrawerMaterial.SetFloat("_BrushSize", brushSize / (float)srcWidth);

            RenderTexture copiedTexture = new RenderTexture(srcWidth, src.height, 32);
            Graphics.Blit(src, copiedTexture, gpuDrawerMaterial);
            DestroyImmediate(src);

            return copiedTexture;
        }
    }
}