uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.23;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.64; kp = rot2(0.45) * kp; kp *= 1.36; }
    v = sin(kp.x * 1.56 - t * 2.50 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.94;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.07 * sin(t * 1.07 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.30;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 = rot2(1.63) * q2;
	float d1 = fieldA(q1, (time * 0.65), 0.0);
	float d2 = fieldB(q2, (time * 0.65), 0.09);
	float d = d1 * d2;
	vec3 col = palette((d) * 1.19 + (time * 0.65) * 0.04, vec3(0.17, 0.33, 0.45), vec3(0.19, 0.27, 0.31), vec3(1.02, 0.95, 0.96), vec3(0.56, 0.45, 0.32));
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 0.97 + (time * 0.65) * 4.94);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.009, 0.991, 0.960);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
