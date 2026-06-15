uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.27 - t * 7.56 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.12 * sin(mf + 3.0) + ph), cos(t * 2.12 * cos(mf + 3.0) + ph));
        ms += 0.044 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 3.36;
	{ float fr = length(p); p *= 1.0 + -0.74 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.83 * p.y + time * 1.70); p.y += 0.50 / wf * cos(wf * 2.59 * p.x + time * 0.94); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.37 + time * 0.17, vec3(0.58, 0.49, 0.40), vec3(0.37, 0.46, 0.36), vec3(1.10, 1.02, 1.06), vec3(0.98, 0.93, 0.09));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
