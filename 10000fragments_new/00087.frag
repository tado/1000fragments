uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.62 * sin(mf + 3.0) + ph), cos(t * 0.61 * cos(mf + 3.0) + ph));
        ms += 0.041 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.01, t * 2.21 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	p = (floor(p * 25.4) + 0.5) / 25.4;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.21 * p.y + time * 0.70); p.y += 0.37 / wf * cos(wf * 1.61 * p.x + time * 1.09); }
	p *= 2.54;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.17);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.48 + time * 0.12, vec3(0.49, 0.55, 0.50), vec3(0.44, 0.48, 0.44), vec3(1.08, 1.09, 0.74), vec3(0.71, 0.44, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
