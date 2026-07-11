uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.82;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.62; kp = rot2(1.35) * kp; kp *= 1.31; }
    v = sin(kp.x * 2.18 - t * 1.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.18;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.33) * p * 14.21;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = mix(vec3(0.88, 0.71, 0.68), vec3(0.01, 0.03, 0.13), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
