uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.50 + 0.17 * pow(abs(cos(ra * 6.0 + t * 1.09)), 0.93);
    v = sin((rr - pet) * 14.41 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.46 + t * 2.19 + ph) + sin(p.y * 16.23 - t * 4.50 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 1.85 * p.y + time * 1.49); p.y += 0.36 / wf * cos(wf * 3.27 * p.x + time * 0.62); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = d1 * d2;
	vec3 col = palette(d * 1.73 + time * 0.06, vec3(0.53, 0.46, 0.48), vec3(0.32, 0.40, 0.41), vec3(1.07, 0.89, 1.26), vec3(0.39, 0.30, 0.83));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
