uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(-0.71 + 0.3 * sin(t * 0.62 + ph), 0.61 + 0.3 * cos(t * 1.17 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 21.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.05;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.76; kp = rot2(1.89) * kp; kp *= 1.40; }
    v = sin(kp.x * 1.50 - t * 2.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.31);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.49, 0.39, 0.87) * (0.24 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 1.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
