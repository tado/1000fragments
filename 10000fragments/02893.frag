uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.81 + vec2(t * 2.70, -t * 2.70) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.29 + sr * 8.88 - t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	p = fract(p * 1.97) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.33, length(p) * 2.10 - time * 0.21); }
	p = rot2(time * -0.68) * p;
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.50 + time * 0.13, vec3(0.46, 0.57, 0.50), vec3(0.49, 0.37, 0.39), vec3(0.81, 0.80, 1.37), vec3(0.62, 0.26, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
