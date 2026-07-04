uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.79;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.48; kp = rot2(1.21) * kp; kp *= 1.29; }
    v = sin(kp.y * 1.84 - t * 2.13 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.02) * p * 12.83;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = mix(vec3(0.80, 0.92, 0.81), vec3(0.07, 0.08, 0.05), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
