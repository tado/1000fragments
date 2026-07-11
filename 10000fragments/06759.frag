uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.96, t * 0.35 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	p = rot2(1.20) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.85, lr * 2.48 + time * 0.50); }
	p += vec2(0.23, 0.24) * sin(length(p) * 2.11 - time * 0.69) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.08, vec3(0.48, 0.44, 0.58), vec3(0.38, 0.47, 0.39), vec3(1.38, 0.93, 1.33), vec3(0.65, 0.09, 0.50));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
