uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.56 + t * 5.29 + ph) + sin(p.y * 10.71 - t * 5.56 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.50 + t * 4.99 + ph) + sin(p.y * 14.76 - t * 4.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.19 * p.y + time * 1.37); p.y += 0.33 / wf * cos(wf * 2.09 * p.x + time * 1.77); }
	p = rot2(time * 1.12) * p;
	{ float fr = length(p); p *= 1.0 + -0.74 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.01, vec3(0.49, 0.47, 0.52), vec3(0.42, 0.44, 0.37), vec3(1.05, 1.01, 1.20), vec3(0.04, 0.77, 0.21));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
