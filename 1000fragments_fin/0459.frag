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
    float grow = floor(p.y * 10.53);
    float gsh = hash21(vec2(grow, floor(t * 4.55))) - 0.5;
    float gx = p.x + gsh * 1.11;
    v = sin(gx * 8.30 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.88));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.27 + sr * 6.66 - t * 1.51 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.96;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.04); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.44, 0.59, rv + 0.05 * sin(t * 1.87 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * -2.16 + (time * 0.59) * 1.39) * q1;
	q2.x += sin(q2.y * 4.41 + (time * 0.59) * 2.42) * 0.40;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.45 / wf * sin(wf * 2.39 * q3.y + (time * 0.59) * 0.77); q3.y += 0.29 / wf * cos(wf * 2.11 * q3.x + (time * 0.59) * 1.29); }
	{ float fr = length(q3); q3 *= 1.0 + 0.80 * fr * fr; }
	float d1 = fieldA(q1, (time * 0.59), 0.0);
	float d2 = fieldB(q2, (time * 0.59), 0.51);
	float d3 = fieldC(q3, (time * 0.59), 0.88);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.854, 0.330, 0.262) * (0.10 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.976, 1.022, 0.951);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
