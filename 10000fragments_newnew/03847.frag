uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.19;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.80; kp = rot2(2.58) * kp; kp *= 1.26; }
    v = sin(kp.x * 2.10 - t * 3.30 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.50;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.78) * p * 20.32;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.65;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.71, 0.76, 0.61), vec3(0.05, 0.04, 0.14), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
