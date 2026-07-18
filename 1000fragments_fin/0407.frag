uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.75;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.42; kp = rot2(1.87) * kp; kp *= 1.25; }
    v = sin(kp.x * 3.99 - t * 4.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.82;
	p.x = abs(p.x) - 0.44;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.70), 0.0);
	vec2 hq = rot2(0.49) * p * 14.92;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.19 + (time * 0.70) * 0.03, vec3(0.61, 0.68, 0.82), vec3(0.26, 0.22, 0.21), vec3(1.02, 1.00, 0.96), vec3(0.49, 0.54, 0.67)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.42));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.975, 1.003, 0.957);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
