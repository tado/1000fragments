uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.85 - t * 2.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.86 * p.y + time * 1.42); p.y += 0.25 / wf * cos(wf * 1.53 * p.x + time * 1.79); }
	p = rot2(length(p) * -3.03 + time * 0.34) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 1.15 + time * 0.25) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.26, vec3(0.55, 0.54, 0.44), vec3(0.31, 0.45, 0.49), vec3(1.10, 0.81, 1.06), vec3(0.61, 0.64, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
