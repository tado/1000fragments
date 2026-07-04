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
    float pet = 0.55 + 0.21 * pow(abs(cos(ra * 6.0 + t * 1.33)), 2.68);
    v = sin((rr - pet) * 20.50 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.58 + t * 0.24) - 0.5) * 2.0;
    v = sin((p.y * 4.96 + zx * 1.23 + t * 0.91) * 3.1415927 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.30;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.08); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.60, rv + 0.05 * sin(t * 0.84 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 1.79 + time * 2.31) * 0.85;
	q1 = (floor(q1 * 22.8) + 0.5) / 22.8;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.90;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.30 / wf * sin(wf * 3.50 * q2.y + time * 2.14); q2.y += 0.32 / wf * cos(wf * 2.42 * q2.x + time * 0.73); }
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 1.04;
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.31; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.75);
	float d3 = fieldC(q3, time, 0.67);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.13 + time * 0.72);
	col = fract(col * 2.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
