uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.86, t * 2.32 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 1.33, length(p) * 5.32 - time * 0.67); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.41, lr * 1.17 + time * 0.18); }
	p = rot2(p.y * -2.04 + time * 0.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.06, vec3(0.48, 0.51, 0.58), vec3(0.32, 0.33, 0.31), vec3(0.86, 1.24, 1.05), vec3(0.24, 0.92, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
