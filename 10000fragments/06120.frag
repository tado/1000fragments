uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.65;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.29 + 0.10 * sin(t * 3.07 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.98;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.69; kp = rot2(0.38) * kp; kp *= 1.25; }
    v = sin(kp.x * 3.40 - t * 2.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.20 * sin(time * 3.26);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.18);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.43));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.32, 0.52), vec3(0.76, 0.80, 0.91), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
