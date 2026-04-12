using System;
using Unity.Burst;
using Unity.Collections;
using Unity.Jobs;
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


        public float fillRatio;
        private NativeArray<bool> _filledBuffer;

        private void Awake()
        {
            drawMapTexture = new Texture2D(1028, 1028);
            var colors = new Color[1028 * 1028];

            drawMapTexture.SetPixels(colors);

            // Magix number: 3/5 y

            GetComponent<Renderer>().material.mainTexture = drawMapTexture;

            _filledBuffer = new NativeArray<bool>(1028 * 1028, Allocator.Persistent);
        }

        private void OnDestroy()
        {
            _filledBuffer.Dispose();
        }

        public bool GetCollision(float u, float v)
        {
            var color = drawMapTexture.GetPixelBilinear(u, v);

            return color.a > collisionThreshold;
        }


        private void FixedUpdate()
        {
            drawMapTexture.Apply();
            CalculateFilled();
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
                _filledBuffer[x - halfBrush + i + (y + j - halfBrush) * 1028] = color.a >= .1f;
            }

            drawMapTexture.SetPixels(
                Mathf.RoundToInt(x - halfBrush),
                Mathf.RoundToInt(y - halfBrush),
                size,
                size,
                colors
            );
        }

        private void CalculateFilled()
        {
            var output = new NativeArray<float>(1, Allocator.TempJob);
            var job = new CalculateFilledJob()
            {
                filledBuffer = _filledBuffer,
                output = output
            };
            job.Run();

            fillRatio = job.output[0];

            output.Dispose();
        }

        [BurstCompile]
        private struct CalculateFilledJob : IJob
        {
            public NativeArray<bool> filledBuffer;
            public NativeArray<float> output;

            public void Execute()
            {
                var filled = 0;
                for (int i = 0; i < filledBuffer.Length; i++)
                    filled += filledBuffer[i] ? 1 : 0;
                output[0] = filled / (filledBuffer.Length - 634070f); // 1028 * 3/5 * 1028
            }
        }
    }
}