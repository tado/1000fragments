uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.68, t * 1.49 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.00 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.32 + t * 1.57 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.53) * p;
	{ p = vec2(atan(p.y, p.x) * 1.40, length(p) * 4.21 - time * 0.30); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.51, lr * 1.05 + time * -0.72); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = d1 * d2;
	vec3 col = palette(d * 0.51 + time * 0.26, vec3(0.57, 0.43, 0.54), vec3(0.42, 0.50, 0.45), vec3(0.73, 1.35, 1.04), vec3(0.32, 0.12, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
