uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.87 + t * 3.42 + ph) + sin(p.y * 11.34 - t * 5.14 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.72 + vec2(t * 2.42, -t * 1.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p = rot2(time * 1.13) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 1.00; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.11, lr * 2.57 + time * -0.55); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = d1 + d2;
	vec3 col = palette(d * 0.84 + time * 0.09, vec3(0.45, 0.55, 0.49), vec3(0.31, 0.38, 0.31), vec3(0.96, 0.95, 1.26), vec3(0.42, 0.08, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
