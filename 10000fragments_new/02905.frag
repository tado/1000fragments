uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.14 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.88 + t * 1.98 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.11, t * 0.51 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	p = rot2(time * 1.05) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.77 * p.y + time * 1.92); p.y += 0.33 / wf * cos(wf * 2.38 * p.x + time * 1.56); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = d1 * d2;
	vec3 col = palette(d * 1.37 + time * 0.17, vec3(0.45, 0.58, 0.45), vec3(0.48, 0.35, 0.34), vec3(0.93, 1.03, 1.39), vec3(0.75, 0.73, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
