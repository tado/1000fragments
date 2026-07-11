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
    float wr = length(p) + 0.24 * vnoise2(p * 4.54 + t * 1.28);
    v = sin(wr * 14.54 - t * 0.67 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.34;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.23); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.55, rv + 0.04 * sin(t * 1.20 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.57 + jf * 4.0), cos(t * 0.46 * jf)) * 0.59;
        xs += sin(length(p - im) * 60.06 - t * 11.39 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.36; q1 = rot2(2.54) * q1; }
	{ q1 = vec2(atan(q1.y, q1.x) * 1.84, length(q1) * 5.06 - (time * 0.66) * 0.99); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.34 / wf * sin(wf * 3.63 * q2.y + (time * 0.66) * 1.62); q2.y += 0.31 / wf * cos(wf * 2.38 * q2.x + (time * 0.66) * 0.65); }
	float d1 = fieldA(q1, (time * 0.66), 0.0);
	float d2 = fieldB(q2, (time * 0.66), 0.23);
	float d3 = fieldC(q3, (time * 0.66), 0.01);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.66) * 0.97));
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.17, 0.10), vec3(0.64, 0.64, 0.72), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.33));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.992, 0.997) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
