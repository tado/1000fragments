uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.25 + t * 1.89 + ph) + sin(p.y * 12.55 - t * 1.89 + ph)
        + sin((p.x + p.y) * 5.67 + t * 1.89 + ph) + sin(length(p) * 8.62 - t * 1.89 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.43 + 0.18 * pow(abs(cos(ra * 6.0 + t * 2.39)), 0.67);
    v = sin((rr - pet) * 8.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.50;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.06 * p.y + time * 1.98); p.y += 0.36 / wf * cos(wf * 2.53 * p.x + time * 0.79); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.11 + time * 0.11, vec3(0.47, 0.50, 0.50), vec3(0.39, 0.31, 0.41), vec3(0.82, 1.23, 1.05), vec3(0.70, 0.03, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
