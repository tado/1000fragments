uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.37 + sin(p.y * 3.45 + t * 3.84) * 3.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.47;
	p = abs(p) - 0.28;
	p = rot2(p.y * 2.08 + time * 0.53) * p;
	p = rot2(1.11) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.38, lr * 2.12 + time * -0.27); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.09, vec3(0.41, 0.40, 0.47), vec3(0.47, 0.41, 0.43), vec3(1.36, 0.76, 1.19), vec3(0.74, 0.06, 0.08));
	col = mod(col * 2.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
