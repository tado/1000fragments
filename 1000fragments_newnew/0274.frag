uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.50;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.62; kp = rot2(1.18) * kp; kp *= 1.18; }
    v = sin(kp.y * 2.33 - t * 4.46 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.66 + jf * 4.0), cos(t * 0.50 * jf)) * 0.81;
        xs += sin(length(p - im) * 191.09 - t * 13.64 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.92;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.46; kp = rot2(1.66) * kp; kp *= 1.25; }
    v = sin(kp.y * 2.83 - t * 3.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.63) * 0.69));
	q3 = rot2((time * 0.63) * -1.28) * q3;
	q3 = rot2(length(q3) * -1.36 + (time * 0.63) * 1.08) * q3;
	float d1 = fieldA(q1, (time * 0.63), 0.0);
	float d2 = fieldB(q2, (time * 0.63), 1.42);
	float d3 = fieldC(q3, (time * 0.63), 0.57);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.65, 0.64, 0.67) + vec3(0.10, 0.09, 0.09);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 1.017, 0.945) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
