uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.37 + t * 1.61 + ph) + sin(p.y * 14.27 - t * 0.76 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.57, lr * 1.04 + time * 0.67); }
	{ p = vec2(atan(p.y, p.x) * 2.73, length(p) * 4.26 - time * 0.57); }
	p = rot2(p.y * -3.94 + time * 0.36) * p;
	p *= 3.02;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.06, vec3(0.51, 0.41, 0.42), vec3(0.38, 0.35, 0.39), vec3(1.06, 1.06, 0.84), vec3(0.11, 0.36, 0.25));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
