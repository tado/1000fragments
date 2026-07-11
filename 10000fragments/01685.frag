uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.51 - t * 1.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 2.81 + time * 0.44); }
	p = rot2(1.20) * p;
	p = fract(p * 2.93) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.18, vec3(0.59, 0.51, 0.51), vec3(0.39, 0.45, 0.46), vec3(1.24, 1.32, 0.71), vec3(0.66, 0.22, 0.58));
	col = mod(col * 2.01, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
