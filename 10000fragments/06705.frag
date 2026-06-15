uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.77, t * 2.29 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.44;
	p = abs(p) - 0.50;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.60, lr * 2.04 + time * 0.13); }
	{ p = vec2(atan(p.y, p.x) * 2.09, length(p) * 2.11 - time * 0.58); }
	p = fract(p * 2.01) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.14, vec3(0.40, 0.55, 0.57), vec3(0.34, 0.31, 0.48), vec3(0.92, 1.39, 1.05), vec3(0.05, 0.68, 0.69));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
