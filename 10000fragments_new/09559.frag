uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.05 + t * 5.09 + ph) + sin(p.y * 6.04 - t * 2.43 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.84 * sin(mf + 3.0) + ph), cos(t * 0.38 * cos(mf + 3.0) + ph));
        ms += 0.038 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.43 / wf * sin(wf * 3.53 * q2.y + time * 0.76); q2.y += 0.47 / wf * cos(wf * 3.73 * q2.x + time * 1.02); }
	{ float fr = length(q2); q2 *= 1.0 + 0.72 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.30);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.20));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.28, 0.40), vec3(0.58, 0.61, 0.54), cc);
	col *= 0.87 + 0.20 * sin(gl_FragCoord.y * 1.87 + time * 16.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
