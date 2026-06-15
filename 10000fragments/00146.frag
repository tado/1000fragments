uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.26 + t * 0.88 + ph) + sin(p.y * 3.55 - t * 0.88 + ph)
        + sin((p.x + p.y) * 9.01 + t * 0.88 + ph) + sin(length(p) * 12.08 - t * 0.88 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 37.08 - t * 4.86 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 35.84 - t * 4.86 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.88;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.29 * p.y + time * 1.06); p.y += 0.40 / wf * cos(wf * 1.98 * p.x + time * 0.98); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.27);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.01 + time * 0.20, vec3(0.60, 0.56, 0.44), vec3(0.45, 0.36, 0.39), vec3(0.86, 1.00, 1.05), vec3(0.78, 0.45, 0.42));
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
