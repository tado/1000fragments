uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.58 + sin(p.y * 3.82 + t * 2.99) * 1.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.58) - 0.5;
	p = rot2(length(p) * -2.86 + time * 1.11) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.69, lr * 2.88 + time * 0.60); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.97 + time * 0.10, vec3(0.54, 0.54, 0.58), vec3(0.34, 0.46, 0.48), vec3(1.35, 1.14, 1.35), vec3(0.75, 0.29, 0.45));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
