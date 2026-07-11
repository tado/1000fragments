uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.11;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.45; kp = rot2(2.10) * kp; kp *= 1.45; }
    v = sin(kp.y * 3.26 - t * 1.26 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.59);
    float gsh = hash21(vec2(grow, floor(t * 6.39))) - 0.5;
    float gx = p.x + gsh * 0.51;
    v = sin(gx * 12.34 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.70));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.86 + time * 1.14) * q1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.30));
	vec3 col = vec3(0.87, 0.17, 0.76) * (0.08 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
