uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.53;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.65; kp = rot2(1.59) * kp; kp *= 1.19; }
    v = sin(kp.x * 3.68 - t * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.76, lr * 2.61 + time * 0.97); }
	p = rot2(time * 0.65) * p;
	p = rot2(2.91) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.15 + time * 0.21, vec3(0.55, 0.43, 0.56), vec3(0.31, 0.39, 0.35), vec3(1.12, 1.03, 0.97), vec3(0.92, 0.34, 0.92));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
