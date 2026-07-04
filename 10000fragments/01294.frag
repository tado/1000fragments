uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.82;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.76; kp = rot2(0.74) * kp; kp *= 1.21; }
    v = sin(kp.y * 2.94 - t * 4.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.27) * p * 20.61;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.83, 0.75, 0.97), vec3(0.06, 0.08, 0.05), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
