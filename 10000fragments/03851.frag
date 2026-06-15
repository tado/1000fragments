uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.20 + sin(p.y * 3.42 + t * 5.58) * 3.60 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	{ p = vec2(atan(p.y, p.x) * 2.40, length(p) * 2.90 - time * 0.29); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 1.31 + time * 0.82) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 1.71 + time * -0.46); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.29, vec3(0.46, 0.40, 0.53), vec3(0.45, 0.46, 0.41), vec3(0.98, 0.78, 0.82), vec3(0.01, 0.24, 0.47));
	col = fract(col * 1.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
