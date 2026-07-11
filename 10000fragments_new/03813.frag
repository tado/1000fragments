uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.95);
    float gsh = hash21(vec2(grow, floor(t * 5.24))) - 0.5;
    float gx = p.x + gsh * 0.82;
    v = sin(gx * 11.32 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.01));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.60);
    float gsh = hash21(vec2(grow, floor(t * 6.14))) - 0.5;
    float gx = p.x + gsh * 0.93;
    v = sin(gx * 19.85 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.15));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.44 + ph), vnoise2(p * 4.44 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.44 + 2.66 * wq + vec2(1.7, 9.2) + t * 0.62),
                   vnoise2(p * 4.44 + 2.53 * wq + vec2(8.3, 2.8) - t * 0.80));
    v = vnoise2(p * 4.44 + 3.50 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * -1.37) * q1;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.36 / wf * sin(wf * 2.46 * q3.y + time * 0.94); q3.y += 0.32 / wf * cos(wf * 1.83 * q3.x + time * 1.11); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.31);
	float d3 = fieldC(q3, time, 1.61);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.30, 0.08), vec3(0.67, 0.84, 0.94), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
