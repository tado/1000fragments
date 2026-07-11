uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.70;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.74; kp = rot2(2.79) * kp; kp *= 1.16; }
    v = sin(kp.x * 2.79 - t * 3.32 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.46);
    float gsh = hash21(vec2(grow, floor(t * 6.20))) - 0.5;
    float gx = p.x + gsh * 0.51;
    v = sin(gx * 16.74 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.04));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.69);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.48));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.84, 0.73, 0.59) + vec3(0.08, 0.22, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
