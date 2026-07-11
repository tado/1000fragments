uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.22 + sr * 22.39 - t * 4.75 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.35 - t * 2.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.34 * fr * fr; }
	p = fract(p * 2.00) - 0.5;
	p = rot2(2.35) * p;
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 2.74 - time * 0.47); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.46);
	float d = d1 + d2;
	vec3 col = palette(d * 0.91 + time * 0.01, vec3(0.56, 0.57, 0.50), vec3(0.36, 0.31, 0.49), vec3(1.23, 1.22, 1.13), vec3(0.52, 0.93, 0.02));
	col = mod(col * 2.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
