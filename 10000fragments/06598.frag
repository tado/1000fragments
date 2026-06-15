uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.06, t * 0.97 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.54 + t * 3.70 + ph) + sin(p.y * 4.34 - t * 3.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 3.82 + time * 0.52) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.21);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.77 + time * 0.15, vec3(0.53, 0.51, 0.43), vec3(0.40, 0.49, 0.40), vec3(0.95, 1.29, 1.33), vec3(0.23, 0.60, 0.55));
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
