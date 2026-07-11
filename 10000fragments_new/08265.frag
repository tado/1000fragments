uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.98 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.51 + t * 1.73 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.78, t * 1.49 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(0.66) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.41);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.96 + time * 0.03, vec3(0.41, 0.43, 0.49), vec3(0.34, 0.47, 0.31), vec3(1.17, 1.11, 1.17), vec3(0.28, 0.80, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
