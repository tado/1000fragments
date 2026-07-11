uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.42 + t * 3.09 + ph) + sin(p.y * 3.27 - t * 3.83 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.88;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.92 * p.y + time * 1.65); p.y += 0.26 / wf * cos(wf * 3.28 * p.x + time * 1.00); }
	p = rot2(time * -1.28) * p;
	{ float fr = length(p); p *= 1.0 + 0.49 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.17, vec3(0.46, 0.53, 0.48), vec3(0.33, 0.48, 0.46), vec3(1.05, 0.97, 1.34), vec3(0.75, 0.17, 0.12));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
