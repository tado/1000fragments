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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.98;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.27); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.50, rv + 0.06 * sin(t * 2.98 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.53 + 0.21 * pow(abs(cos(ra * 5.0 + t * 0.93)), 0.93);
    v = sin((rr - pet) * 23.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.82, lr * 2.73 + (time * 0.73) * -0.91); }
	q2 *= 1.0 + 0.25 * sin((time * 0.73) * 1.95);
	float d1 = fieldA(q1, (time * 0.73), 0.0);
	float d2 = fieldB(q2, (time * 0.73), 0.06);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.73) * 1.43));
	vec3 col = vec3(0.65, 0.54, 0.65) * (0.09 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.923, 0.983, 1.035) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
