uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.34 * sin(mf + 3.0) + ph), cos(t * 1.34 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.71, t * 1.47 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.88) * p;
	p = rot2(0.47) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 1.76 * p.y + time * 1.73); p.y += 0.38 / wf * cos(wf * 2.35 * p.x + time * 0.69); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.03 + time * 0.04, vec3(0.49, 0.44, 0.50), vec3(0.42, 0.43, 0.50), vec3(1.20, 1.22, 1.33), vec3(0.91, 0.34, 0.74));
	col = fract(col * 1.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
