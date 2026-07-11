uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.50 * jf)) * 0.79;
        xs += sin(length(p - im) * 194.38 - t * 12.30 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.08;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.54; kp = rot2(0.75) * kp; kp *= 1.38; }
    v = sin(kp.x * 2.48 - t * 4.99 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.97 + t * 1.94 + ph) * 0.7;
    float wb = sin(p.y * 13.95 - t * 2.43 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.39;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 2.17, lr * 2.74 + time * 0.49); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.09);
	float d3 = fieldC(q3, time, 1.75);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.06 + time * 0.82);
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
