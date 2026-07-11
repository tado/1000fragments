uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.96 + sin(p.y * 2.51 + t * 4.07) * 3.10 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.41 + t * 4.99 + ph) + sin(p.y * 5.66 - t * 4.24 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.40) * p;
	{ p = vec2(atan(p.y, p.x) * 2.12, length(p) * 4.89 - time * 0.96); }
	p = rot2(time * 1.18) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.45 + time * 0.09, vec3(0.43, 0.59, 0.40), vec3(0.36, 0.42, 0.39), vec3(0.95, 1.20, 1.38), vec3(0.16, 0.35, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
