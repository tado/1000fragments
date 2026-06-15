uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.89, t * 1.93 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.55 + sin(p.y * 1.17 + t * 2.33) * 3.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.48, lr * 1.09 + time * 0.55); }
	p *= 1.73;
	p = rot2(p.y * -2.84 + time * 0.66) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.62 + time * 0.03, vec3(0.59, 0.43, 0.41), vec3(0.32, 0.33, 0.48), vec3(1.23, 0.99, 0.76), vec3(0.93, 0.51, 0.65));
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
