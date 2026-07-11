uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.54) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 1.26 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.98 + sin(p.y * 3.00 + t * 0.52) * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.68 * p.y + time * 1.20); p.y += 0.39 / wf * cos(wf * 2.18 * p.x + time * 0.69); }
	p = rot2(0.62) * p;
	{ float fr = length(p); p *= 1.0 + -0.45 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.03, vec3(0.56, 0.58, 0.43), vec3(0.38, 0.43, 0.39), vec3(1.29, 1.13, 1.30), vec3(0.33, 0.24, 0.95));
	col = fract(col * 1.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
