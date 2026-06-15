uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.86 + vec2(t * 0.39, -t * 0.39) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.61 + sin(p.y * 3.22 + t * 4.57) * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(0.54) * p;
	p = rot2(p.y * 1.24 + time * 0.39) * p;
	{ float fr = length(p); p *= 1.0 + 0.61 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.74);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.59 + time * 0.14, vec3(0.44, 0.49, 0.49), vec3(0.49, 0.42, 0.49), vec3(0.92, 1.26, 0.88), vec3(0.81, 0.20, 0.63));
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
