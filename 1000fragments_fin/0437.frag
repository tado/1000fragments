uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.65 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.38 + t * 2.39 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	p *= 1.79;
	float d = 0.5 + 0.5 * field(p, (time * 0.73), 0.0);
	vec2 hq = rot2(0.55) * p * 10.56;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.13, 0.03, 0.05), vec3(0.91, 0.90, 0.76), v);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.984, 1.011, 0.943);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
