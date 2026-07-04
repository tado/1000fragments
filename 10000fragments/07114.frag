uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.65;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.75) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 0.54) * sin(3.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.60 + vec2(t * 0.84, -t * 1.26) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.47, 0.10) * sin(length(q1) * 4.42 - time * 1.58) * 0.14;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.02, lr * 2.33 + time * 0.24); }
	q2 = rot2(time * -0.38) * q2;
	q2 = (floor(q2 * 18.1) + 0.5) / 18.1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.29, 0.23), vec3(0.79, 0.76, 0.42), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
