uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.95 + jf * 4.0), cos(t * 0.34 * jf)) * 0.37;
        xs += sin(length(p - im) * 76.48 - t * 7.76 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.21;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.62; kp = rot2(1.22) * kp; kp *= 1.27; }
    v = sin(kp.x * 1.66 - t * 4.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.80;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.51;
	q1 = rot2(q1.y * 2.36 + time * 0.82) * q1;
	q2 = rot2(q2.y * 1.70 + time * 0.62) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.59));
	vec3 col = vec3(0.80, 0.47, 0.41) * (0.17 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
