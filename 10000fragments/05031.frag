uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.91 + 0.16 * sin(t * 1.43)) + vec2(-0.61, 0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 22; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 22.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 5.00 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.29 + t * 3.21 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.07);
    float gsh = hash21(vec2(grow, floor(t * 2.33))) - 0.5;
    float gx = p.x + gsh * 1.16;
    v = sin(gx * 14.25 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.64));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.08));
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.36 / wf * sin(wf * 1.98 * q2.y + time * 0.84); q2.y += 0.48 / wf * cos(wf * 2.74 * q2.x + time * 2.18); }
	{ q3 = vec2(atan(q3.y, q3.x) * 1.86, length(q3) * 2.14 - time * 0.85); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.43);
	float d3 = fieldC(q3, time, 0.65);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.88 + time * 0.23, vec3(0.46, 0.49, 0.46), vec3(0.45, 0.44, 0.43), vec3(1.31, 1.08, 0.76), vec3(0.10, 0.52, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
