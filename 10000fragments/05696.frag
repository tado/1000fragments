uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.21;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.59; kp = rot2(1.71) * kp; kp *= 1.32; }
    v = sin(kp.x * 2.72 - t * 1.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.43) * p * 15.08;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.96, 0.97, 0.70), vec3(0.06, 0.10, 0.04), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.70 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
