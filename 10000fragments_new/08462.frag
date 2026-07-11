uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.70 + t * 4.41 + ph) + sin(p.y * 16.47 - t * 1.64 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.40 + vec2(t * 2.05, -t * 1.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	{ float fr = length(p); p *= 1.0 + 0.39 * fr * fr; }
	p = rot2(length(p) * -1.50 + time * 0.92) * p;
	p = fract(p * 2.10) - 0.5;
	p = (floor(p * 17.5) + 0.5) / 17.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.65);
	float d = d1 * d2;
	vec3 col = palette(d * 0.76 + time * 0.24, vec3(0.51, 0.54, 0.51), vec3(0.36, 0.40, 0.34), vec3(1.29, 1.34, 0.98), vec3(0.72, 0.12, 0.06));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.18 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
