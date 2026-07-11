uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.49;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.80; kp = rot2(0.84) * kp; kp *= 1.41; }
    v = sin(kp.y * 2.66 - t * 3.76 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.76 + jf * 4.0), cos(t * 0.35 * jf)) * 0.78;
        xs += sin(length(p - im) * 84.68 - t * 6.88 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.94;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.24 / wf * sin(wf * 3.05 * q1.y + time * 1.77); q1.y += 0.23 / wf * cos(wf * 1.50 * q1.x + time * 0.94); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.01);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.97));
	vec3 col = palette(d * 1.24 + time * 0.10, vec3(0.53, 0.46, 0.58), vec3(0.48, 0.36, 0.41), vec3(0.97, 1.38, 0.71), vec3(0.55, 0.82, 0.44));
	col *= 0.88 + 0.15 * sin(gl_FragCoord.y * 2.03 + time * 14.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
