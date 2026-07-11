uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.99;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.63; kp = rot2(2.56) * kp; kp *= 1.32; }
    v = sin(kp.y * 2.01 - t * 2.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.34;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.91) * p * 11.92;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.94, 0.72, 0.78), vec3(0.11, 0.08, 0.20), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
