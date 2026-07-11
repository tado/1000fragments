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
    vec2 cq = p * 11.37 + vec2(t * 2.38, -t * 1.42) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.97 + sr * 6.68 - t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	{ p = vec2(atan(p.y, p.x) * 1.40, length(p) * 5.34 - time * 0.43); }
	p = rot2(length(p) * 3.67 + time * 0.49) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.92 + time * 0.12, vec3(0.48, 0.56, 0.59), vec3(0.30, 0.35, 0.34), vec3(1.39, 1.31, 0.94), vec3(0.27, 0.24, 0.78));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
