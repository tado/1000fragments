uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.64;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.22 + 0.07 * sin(t * 3.39 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.64 + (time * 0.75) * 0.43) * 0.08;
	p *= 0.71;
	p *= 2.68;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.19 * p.y + (time * 0.75) * 1.01); p.y += 0.29 / wf * cos(wf * 2.20 * p.x + (time * 0.75) * 1.23); }
	float d = clamp(0.5 + 0.5 * field(p, (time * 0.75), 0.0), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.016, 0.091, 0.089), vec3(0.168, 0.579, 0.479), smoothstep(0.0, 0.44, d)), vec3(0.946, 0.936, 0.874), smoothstep(0.44, 1.0, d));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.016, 0.966, 1.023);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
