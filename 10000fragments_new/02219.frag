uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.17 * pow(abs(cos(ra * 4.0 + t * 0.87)), 1.41);
    v = sin((rr - pet) * 8.07 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.32 + ph), vnoise2(p * 2.32 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.32 + 1.79 * wq + vec2(1.7, 9.2) + t * 1.06),
                   vnoise2(p * 2.32 + 1.26 * wq + vec2(8.3, 2.8) - t * 0.75));
    v = vnoise2(p * 2.32 + 3.06 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.77 + vec2(t * 1.08, -t * 2.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.26 / wf * sin(wf * 1.79 * q1.y + time * 1.24); q1.y += 0.36 / wf * cos(wf * 3.02 * q1.x + time * 1.95); }
	q1.x += sin(q1.y * 4.51 + time * 3.49) * 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d3 = fieldC(q3, time, 1.61);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.11, 0.35), vec3(0.56, 0.62, 0.91), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
