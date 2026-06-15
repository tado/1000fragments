uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.89 + sin(p.y * 4.01 + t * 1.16) * 2.05 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.66 + sin(p.y * 2.97 + t * 3.32) * 4.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	p = rot2(0.93) * p;
	p = rot2(p.y * 3.34 + time * 0.27) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.11, lr * 2.52 + time * 0.78); }
	p += vec2(0.38, -0.22) * sin(length(p) * 5.97 - time * 1.09) * 0.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.72 + time * 0.06, vec3(0.60, 0.51, 0.44), vec3(0.46, 0.38, 0.38), vec3(1.27, 0.77, 0.72), vec3(0.31, 0.73, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
