uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.56);
    float gsh = hash21(vec2(grow, floor(t * 3.89))) - 0.5;
    float gx = p.x + gsh * 0.75;
    v = sin(gx * 13.25 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.24));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.32;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.68; kp = rot2(1.97) * kp; kp *= 1.18; }
    v = sin(kp.x * 3.14 - t * 4.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.05, lr * 2.87 + time * 0.37); }
	q1 = rot2(q1.y * 2.04 + time * 0.58) * q1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.59, length(q2) * 4.16 - time * 0.51); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.54));
	vec3 col = hue(d * 0.68 + time * 0.33);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.11 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
