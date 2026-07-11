uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 23.66 - t * 3.29 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 14.17 - t * 6.98 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.52) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.05, lr * 2.21 + time * 0.50); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.01, vec3(0.46, 0.47, 0.56), vec3(0.43, 0.43, 0.38), vec3(1.04, 0.82, 1.00), vec3(0.62, 0.43, 0.85));
	col = mod(col * 1.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
