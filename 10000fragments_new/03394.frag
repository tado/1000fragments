uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.79 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.78 + t * 2.90 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.46 * jf)) * 0.52;
        xs += sin(length(p - im) * 96.65 - t * 7.99 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.36 / wf * sin(wf * 2.88 * q1.y + time * 1.92); q1.y += 0.46 / wf * cos(wf * 2.47 * q1.x + time * 1.64); }
	q2 = (floor(q2 * 15.9) + 0.5) / 15.9;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.27 / wf * sin(wf * 1.93 * q2.y + time * 0.88); q2.y += 0.35 / wf * cos(wf * 1.56 * q2.x + time * 1.99); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.50);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.90));
	vec3 col = palette(d * 1.36 + time * 0.30, vec3(0.43, 0.54, 0.40), vec3(0.37, 0.49, 0.44), vec3(0.70, 0.78, 1.16), vec3(0.38, 0.90, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
