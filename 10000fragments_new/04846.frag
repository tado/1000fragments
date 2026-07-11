uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.70;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.78; kp = rot2(2.43) * kp; kp *= 1.25; }
    v = sin(kp.y * 3.19 - t * 2.81 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.46; vec2 jc = vec2(-0.50 + 0.3 * sin(t * 1.08 + ph), 0.54 + 0.3 * cos(t * 1.17 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 17.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.81 + sr * 13.04 - t * 2.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = (floor(q2 * 9.0) + 0.5) / 9.0;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.16);
	float d3 = fieldC(q3, time, 1.01);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.64 + time * 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
