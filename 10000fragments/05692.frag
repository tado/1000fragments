uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.04 + t * 2.60 + ph) * 0.7;
    float wb = sin(p.y * 18.72 - t * 0.65 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.73;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.65 + t * 5.57 + ph) + sin(p.y * 10.11 - t * 5.28 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = rot2(time * 0.91) * p;
	{ float fr = length(p); p *= 1.0 + 0.71 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.66 + time * 0.08, vec3(0.52, 0.60, 0.43), vec3(0.36, 0.43, 0.48), vec3(1.07, 1.24, 1.08), vec3(0.37, 0.70, 0.32));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
