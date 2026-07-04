uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.88 + vec2(t * 1.46, -t * 0.47) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.11 + vec2(t * 0.83, -t * 0.88);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 37.89 - t * 5.83 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 23.10 - t * 7.54 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = fract(q2 * 2.38) - 0.5;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.56;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.39);
	float d3 = fieldC(q3, time, 1.06);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.04 + time * 0.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
