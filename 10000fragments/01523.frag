uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.54 - t * 8.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	p = rot2(2.60) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.27, lr * 2.24 + time * 0.13); }
	p += vec2(-0.76, 0.26) * sin(length(p) * 2.60 - time * 0.73) * 0.35;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.29, vec3(0.45, 0.55, 0.43), vec3(0.43, 0.47, 0.34), vec3(1.03, 1.17, 0.85), vec3(0.72, 0.49, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
