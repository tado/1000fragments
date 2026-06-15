uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.82 + t * 0.93 + ph) + sin(p.y * 9.68 - t * 5.31 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.02 + sr * 8.74 - t * 1.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	p *= 1.54;
	p = rot2(length(p) * -1.91 + time * 0.73) * p;
	p += vec2(0.33, -0.53) * sin(length(p) * 3.80 - time * 1.39) * 0.35;
	{ float fr = length(p); p *= 1.0 + -0.35 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.65);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.77 + time * 0.14, vec3(0.48, 0.50, 0.48), vec3(0.30, 0.34, 0.44), vec3(0.99, 1.25, 0.97), vec3(0.50, 0.62, 0.27));
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
