uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.15;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.25 + 0.13 * sin(t * 4.43 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.28 + (time * 0.59) * 0.96) * 0.11;
	p += vec2(sin((time * 0.59) * 0.60), cos((time * 0.59) * 0.91)) * 0.22;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.78, length(p) * 5.87 - (time * 0.59) * 0.73); }
	p = sin(p * 1.58 + (time * 0.59) * 1.59) * 1.30;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.29 * p.y + (time * 0.59) * 1.64); p.y += 0.46 / wf * cos(wf * 3.36 * p.x + (time * 0.59) * 1.18); }
	float d = field(p, (time * 0.59), 0.0);
	vec3 col = palette(d * 0.57 + (time * 0.59) * 0.01, vec3(0.45, 0.43, 0.45), vec3(0.30, 0.32, 0.29), vec3(0.61, 0.40, 0.67), vec3(0.32, 0.54, 0.16));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(0.934, 0.994, 1.053) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
