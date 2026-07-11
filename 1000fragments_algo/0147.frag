uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.51;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.32 + 0.07 * sin(t * 4.99 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.82) * 0.89), cos((time * 0.82) * 1.01)) * 0.06;
	p *= 2.61;
	p = fract(p * 1.19) - 0.5;
	p *= 1.0 + 0.18 * sin((time * 0.82) * 1.50);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.57 * p.y + (time * 0.82) * 1.80); p.y += 0.48 / wf * cos(wf * 2.53 * p.x + (time * 0.82) * 0.71); }
	float d = field(p, (time * 0.82), 0.0);
	vec3 col = palette(d * 1.14 + (time * 0.82) * 0.08, vec3(0.27, 0.29, 0.30), vec3(0.20, 0.26, 0.23), vec3(0.42, 0.89, 0.68), vec3(0.23, 0.15, 0.22));
	col = clamp((col - 0.5) * 1.68 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 0.992, 0.945) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
