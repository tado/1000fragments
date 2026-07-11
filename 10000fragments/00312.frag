uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.67 + sin(p.y * 4.74 + t * 5.35) * 3.58 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.26 + t * 2.40 + ph) + sin(p.y * 13.80 - t * 2.74 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.67 * p.y + time * 1.07); p.y += 0.23 / wf * cos(wf * 1.99 * p.x + time * 1.39); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.97);
	float d = d1 * d2;
	vec3 col = palette(d * 0.84 + time * 0.08, vec3(0.58, 0.48, 0.49), vec3(0.35, 0.41, 0.40), vec3(1.16, 1.24, 1.10), vec3(0.30, 0.28, 0.61));
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
