uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.65 + t * 2.83 + ph) + sin(p.y * 5.45 - t * 2.83 + ph)
        + sin((p.x + p.y) * 4.86 + t * 2.83 + ph) + sin(length(p) * 3.11 - t * 2.83 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.32 + sr * 8.25 - t * 2.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	p = abs(p) - 0.75;
	p = rot2(time * 1.32) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.49);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.19 + time * 0.18, vec3(0.47, 0.48, 0.51), vec3(0.34, 0.34, 0.46), vec3(1.35, 1.03, 0.78), vec3(0.63, 0.01, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
