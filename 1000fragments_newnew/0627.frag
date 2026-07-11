uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.88 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.17 + t * 2.15 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.42);
    float gsh = hash21(vec2(grow, floor(t * 4.88))) - 0.5;
    float gx = p.x + gsh * 0.75;
    v = sin(gx * 7.98 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.45));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 1.46 + (time * 0.77) * 2.13) * 1.35;
	q2.y += sin(q2.x * 7.10 + (time * 0.77) * 3.32) * 0.31;
	float d1 = fieldA(q1, (time * 0.77), 0.0);
	float d2 = fieldB(q2, (time * 0.77), 1.02);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.02, 0.01), vec3(0.70, 0.72, 0.78), cc);
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.968, 1.023, 0.947) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
