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
    float wa = sin(p.x * 10.70 + t * 2.28 + ph) * 0.7;
    float wb = sin(p.y * 9.75 - t * 3.79 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.22;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.62;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.58; kp = rot2(2.76) * kp; kp *= 1.21; }
    v = sin(kp.x * 1.63 - t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.22;
	p.y = abs(p.y);
	p = rot2(p.y * 2.12 + (time * 0.64) * 0.29) * p;
	float d1 = field(p, (time * 0.64), 0.0);
	float d2 = field2(p, (time * 0.64), 1.02);
	float d = d1 * d2;
	vec3 col = palette(d * 1.40 + (time * 0.64) * 0.10, vec3(0.48, 0.42, 0.38), vec3(0.42, 0.38, 0.33), vec3(1.03, 1.05, 1.04), vec3(0.02, 0.35, 0.53));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.931, 0.988, 1.047);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
