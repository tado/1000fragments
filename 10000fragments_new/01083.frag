uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.12 + sr * 15.18 - t * 1.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 16.8) + 0.5) / 16.8;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.04 * p.y + time * 1.90); p.y += 0.46 / wf * cos(wf * 2.52 * p.x + time * 0.62); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.22, vec3(0.42, 0.53, 0.54), vec3(0.43, 0.31, 0.50), vec3(0.95, 0.86, 0.87), vec3(0.04, 0.98, 0.47));
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 0.90 + time * 5.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
