uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.92);
    float gsh = hash21(vec2(grow, floor(t * 6.68))) - 0.5;
    float gx = p.x + gsh * 0.68;
    v = sin(gx * 14.95 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.62));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 20.00 + t * 1.95 + ph) * 0.7;
    float wb = sin(p.y * 19.87 - t * 2.53 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.33;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.59; q1 = rot2(0.78) * q1; }
	q1 *= 2.09;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.49 / wf * sin(wf * 2.49 * q2.y + time * 1.08); q2.y += 0.38 / wf * cos(wf * 3.85 * q2.x + time * 2.06); }
	q2 *= 3.10;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.93);
	float d = min(d1, d2);
	vec3 col = vec3(0.91, 0.42, 0.20) * (0.22 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.04 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
