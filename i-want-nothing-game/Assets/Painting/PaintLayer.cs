using System;
using Unity.Collections;
using UnityEngine;
using UnityEngine.Rendering;
using Random = UnityEngine.Random;

namespace DefaultNamespace
{
    public class PaintLayer : MonoBehaviour
    {
        [SerializeField] private float collisionThreshold;

        public Color brushColor = Color.black;
        public Texture2D brushTexture;
        [Range(0, 1)] public float brushHardness = 1f;

        Material gpuDrawerMaterial;

        private Texture2D drawMapTexture;


        private void Awake()
        {
            drawMapTexture = new Texture2D(1028, 1028);
            var colors = new Color[1028 * 1028];
            drawMapTexture.SetPixels(colors);

            GetComponent<Renderer>().material.mainTexture = drawMapTexture;
        }

        public bool GetCollision(float u, float v)
        {
            var color = drawMapTexture.GetPixelBilinear(u, v);

            return color.a > collisionThreshold;
        }


        private void FixedUpdate()
        {
            drawMapTexture.Apply();
        }


        public void Paint(Vector2 at, Color color, int size)
        {
            var x = Mathf.RoundToInt(at.x * drawMapTexture.width);
            var y = Mathf.RoundToInt(at.y * drawMapTexture.height);

            var halfBrush = size / 2;
            Color[] colors = new Color[size * size];
            for (int i = 0; i < size; i++)
            for (int j = 0; j < size; j++)
            {
                colors[i * size + j] = color;
            }

            drawMapTexture.SetPixels(
                Mathf.RoundToInt(x - halfBrush),
                Mathf.RoundToInt(y - halfBrush),
                size,
                size,
                colors
            );
        }
    }
}