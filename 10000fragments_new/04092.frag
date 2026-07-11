uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.37;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.54; kp = rot2(0.68) * kp; kp *= 1.24; }
    v = sin(kp.y * 1.66 - t * 3.36 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.36 + jf * 4.0), cos(t * 0.47 * jf)) * 0.30;
        xs += sin(length(p - im) * 104.40 - t * 13.98 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(time * -0.60) * q2;
	q2 = fract(q2 * 2.81) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.32);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.08, 0.93, 1.39) + vec3(0.22, 0.22, 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
