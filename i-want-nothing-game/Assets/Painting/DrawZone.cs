// using System;
// using System.Collections;
// using System.Collections.Generic;
// using System.Linq;
// using Unity.Collections;
// using Unity.VisualScripting;
// using UnityEngine;
// using UnityEngine.Experimental.Rendering;
// using UnityEngine.Rendering;
//
// [RequireComponent(typeof(MeshRenderer))]
// [RequireComponent(typeof(BoxCollider))]
// public class DrawZone : MonoBehaviour
// {
//     public MeshRenderer MeshRenderer { get; private set; }
//
//     public virtual Texture DrawTexture
//     {
//         get => MeshRenderer.material.mainTexture;
//         set => MeshRenderer.material.mainTexture = value;
//     }
//
//     Texture initialTexture;
//     private NativeArray<bool> _collisionMap;
//
//     public bool GetCollision(float u, float v)
//     {
//         var x = Mathf.RoundToInt(u * initialTexture.width);
//         var y = Mathf.RoundToInt(v * initialTexture.height);
//
//         var collides = false;
//         // for (var xo = -1; xo <= 1; xo++)
//         // for (var yo = -1; yo <= 1; yo++)
//             collides =  _collisionMap[(x ) + initialTexture.width + (y )];
//
//         return collides;
//     }
//
//
//     public void SetCollision(float u, float v, bool collision)
//     {
//         var x = Mathf.RoundToInt(u * initialTexture.width);
//         var y = Mathf.RoundToInt(v * initialTexture.height);
//
//         _collisionMap[(x) + initialTexture.width + (y)] = collision;
//     }
//
//
//     protected virtual void Awake()
//     {
//         MeshRenderer = GetComponent<MeshRenderer>();
//
//         CreateTexture();
//
//         _collisionMap = new NativeArray<bool>(initialTexture.width * initialTexture.height, Allocator.Persistent);
//     }
//
//     private void OnDestroy()
//     {
//         _collisionMap.Dispose();
//     }
//
//     public void CreateTexture()
//     {
//         if (!initialTexture)
//         {
//             initialTexture = new Texture2D(1028, 1028);
//             var tex2D = (Texture2D)initialTexture;
//             var fillColorArray = tex2D.GetPixels();
//
//             for (var i = 0; i < fillColorArray.Length; ++i)
//                 fillColorArray[i] = new Color(0, 0, 0, 0);
//
//             tex2D.SetPixels(fillColorArray);
//             tex2D.Apply();
//         }
//
//         RenderTexture rt =
//             new RenderTexture(initialTexture.width, initialTexture.height, 0);
//
//         RenderTexture.active = rt;
//         Graphics.Blit(initialTexture, rt);
//
//         DrawTexture = rt;
//     }
// }