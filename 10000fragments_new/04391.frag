uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.74 + t * 2.39 + ph) * 0.7;
    float wb = sin(p.y * 18.03 - t * 1.61 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.30;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.76;
	p = rot2(length(p) * -3.73 + time * 1.19) * p;
	{ p = vec2(atan(p.y, p.x) * 2.45, length(p) * 3.01 - time * 0.99); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.76 + time * 0.43); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.03, vec3(0.44, 0.57, 0.50), vec3(0.36, 0.43, 0.30), vec3(1.12, 0.77, 0.77), vec3(0.57, 0.59, 0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
