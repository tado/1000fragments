uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.26 + t * 5.69 + ph) + sin(p.y * 7.33 - t * 3.49 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.66, lr * 2.68 + time * 0.42); }
	{ p = vec2(atan(p.y, p.x) * 1.98, length(p) * 3.28 - time * 0.43); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(1.02) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.06, vec3(0.48, 0.47, 0.45), vec3(0.33, 0.42, 0.47), vec3(1.09, 0.79, 0.80), vec3(0.36, 0.86, 0.82));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
