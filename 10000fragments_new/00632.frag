uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 4.03 * sin(t * 1.10) + t * 4.94 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.35 * sin(mf + 3.0) + ph), cos(t * 1.26 * cos(mf + 3.0) + ph));
        ms += 0.092 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.46 * p.y + time * 1.20); p.y += 0.49 / wf * cos(wf * 3.63 * p.x + time * 1.18); }
	p = fract(p * 1.20) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.36 + time * 0.20, vec3(0.55, 0.52, 0.52), vec3(0.42, 0.35, 0.35), vec3(1.23, 1.34, 0.88), vec3(0.93, 0.94, 0.61));
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
