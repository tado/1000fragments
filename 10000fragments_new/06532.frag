uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.74;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.41; kp = rot2(2.48) * kp; kp *= 1.39; }
    v = sin(kp.x * 1.32 - t * 1.39 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.98 + jf * 4.0), cos(t * 0.30 * jf)) * 0.86;
        xs += sin(length(p - im) * 183.34 - t * 11.41 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.28 + t * 0.52 + ph) * 0.7;
    float wb = sin(p.y * 10.73 - t * 2.33 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.26;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.72 * fr * fr; }
	q1 *= 1.20;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3 = rot2(length(q3) * -2.59 + time * 0.50) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d3 = fieldC(q3, time, 0.45);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.18 + time * 0.24);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.81 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
