uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 24.15 - t * 3.50 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 32.45 - t * 3.50 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.92 + time * 0.93) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.11, lr * 2.38 + time * 0.20); }
	p = fract(p * 1.38) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.07, vec3(0.51, 0.51, 0.50), vec3(0.47, 0.31, 0.37), vec3(1.18, 0.79, 0.79), vec3(0.85, 0.31, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
