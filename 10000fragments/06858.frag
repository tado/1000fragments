uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.98 + t * 3.72 + ph) + sin(p.y * 10.68 - t * 3.72 + ph)
        + sin((p.x + p.y) * 8.96 + t * 3.72 + ph) + sin(length(p) * 15.00 - t * 3.72 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.20, t * 2.09 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	p = rot2(time * 0.75) * p;
	p = rot2(p.y * 3.17 + time * 0.91) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.67);
	float d = d1 + d2;
	vec3 col = palette(d * 1.65 + time * 0.15, vec3(0.57, 0.57, 0.45), vec3(0.40, 0.47, 0.48), vec3(1.10, 1.25, 0.79), vec3(0.81, 0.85, 0.83));
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
