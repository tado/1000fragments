uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.99 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.86 + t * 2.98 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.26) * p * 19.84;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.03, 0.08, 0.04), vec3(0.73, 0.77, 0.62), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
