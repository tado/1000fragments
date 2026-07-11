uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.39, t * 1.27 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.94 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.09) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.27, length(p) * 2.02 - time * 0.95); }
	p += vec2(-0.11, 0.31) * sin(length(p) * 3.40 - time * 2.28) * 0.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.59 + time * 0.04, vec3(0.43, 0.56, 0.56), vec3(0.49, 0.47, 0.31), vec3(1.23, 1.08, 1.38), vec3(0.17, 0.27, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
