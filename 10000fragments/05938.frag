uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.09;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.57; kp = rot2(0.75) * kp; kp *= 1.37; }
    v = sin(kp.x * 2.93 - t * 2.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.63;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.22) * p * 9.86;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.71, 0.72, 0.62), vec3(0.10, 0.02, 0.17), v);
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 1.78 + time * 13.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
