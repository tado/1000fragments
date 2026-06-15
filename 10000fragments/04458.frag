uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 34.12 - t * 5.89 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 9.59 - t * 5.89 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 12.03 - t * 1.08 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 18.49 - t * 1.08 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.24, lr * 2.38 + time * -0.15); }
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 5.56 - time * 0.51); }
	p = rot2(1.34) * p;
	p = abs(p) - 0.52;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.39);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.09, vec3(0.47, 0.52, 0.43), vec3(0.47, 0.48, 0.45), vec3(1.36, 0.87, 0.98), vec3(0.26, 0.42, 0.04));
	col = clamp((col - 0.5) * 1.94 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
