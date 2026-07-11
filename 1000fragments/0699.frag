uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.65 - t * 7.45 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.99 * p.y + time * 0.75); p.y += 0.30 / wf * cos(wf * 3.31 * p.x + time * 1.11); }
	p *= 1.82;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.03, vec3(0.59, 0.47, 0.53), vec3(0.44, 0.44, 0.48), vec3(1.33, 0.82, 0.83), vec3(0.60, 0.55, 0.82));
	col = mod(col * 2.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
