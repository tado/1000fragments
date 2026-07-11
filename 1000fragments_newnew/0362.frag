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
    vec3 g = vec3(p * 5.40, t * 0.64 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.43 + vec2(t * 0.51, -t * 0.85) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.78;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.75); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.38, 0.59, rv + 0.10 * sin(t * 1.47 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.67) * 0.77));
	q3 = (floor(q3 * 15.3) + 0.5) / 15.3;
	q3 *= 1.0 + 0.35 * sin((time * 0.67) * 1.87);
	float d1 = fieldA(q1, (time * 0.67), 0.0);
	float d2 = fieldB(q2, (time * 0.67), 1.29);
	float d3 = fieldC(q3, (time * 0.67), 1.41);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.50, 0.48, 0.56) * (0.08 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.948, 0.991) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
