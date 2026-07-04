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
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.12 * sin(mf + 3.0) + ph), cos(t * 0.56 * cos(mf + 3.0) + ph));
        ms += 0.052 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.05 + vec2(t * 0.64, -t * 1.38) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.56 * p.y + time * 1.82); p.y += 0.47 / wf * cos(wf * 2.69 * p.x + time * 1.18); }
	p = rot2(length(p) * -3.01 + time * 0.51) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.16);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.79 + time * 0.19, vec3(0.52, 0.41, 0.52), vec3(0.47, 0.30, 0.49), vec3(1.39, 1.10, 1.09), vec3(0.40, 0.71, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
