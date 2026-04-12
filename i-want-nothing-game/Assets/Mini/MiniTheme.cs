using UnityEngine;

namespace DefaultNamespace
{
    [CreateAssetMenu(fileName = "FILENAME", menuName = "Mini theme", order = 0)]
    public class MiniTheme : ScriptableObject
    {
        public Color color;
        public Texture2D texture;
    }
}