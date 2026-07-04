uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.19 + vec2(t * 1.16, -t * 0.58);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.16 * cos(sa * 5.0 + t * 0.82 + ph);
    v = sin((sr - petal) * 7.77);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.23 * sin(time * 3.76);
	{ q2 = vec2(atan(q2.y, q2.x) * 2.48, length(q2) * 5.16 - time * 0.93); }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.31; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.64);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.55));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.07, 0.09), vec3(0.74, 0.75, 0.85), cc);
	col = mod(col * 1.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
