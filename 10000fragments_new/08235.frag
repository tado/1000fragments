uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.47 * jf)) * 0.59;
        xs += sin(length(p - im) * 103.85 - t * 8.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.66 + sin(p.y * 5.87 + t * 2.92) * 2.01 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.15;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.51; kp = rot2(1.41) * kp; kp *= 1.36; }
    v = sin(kp.y * 1.94 - t * 2.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 += vec2(-0.55, 0.07) * sin(length(q2) * 3.94 - time * 1.94) * 0.29;
	q2 = abs(q2);
	q3 *= 2.87;
	q3 = rot2(length(q3) * -1.38 + time * 1.25) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d3 = fieldC(q3, time, 0.18);
	d2 = min(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.49));
	vec3 col = vec3(0.76, 0.58, 0.42) * (0.11 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = fract(col * 1.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
