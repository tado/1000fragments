uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.25 + t * 2.67 + ph) + sin(p.y * 7.97 - t * 2.67 + ph)
        + sin((p.x + p.y) * 2.16 + t * 2.67 + ph) + sin(length(p) * 12.39 - t * 2.67 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.79;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 18.91 - t * 4.05 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.16 * p.y + time * 2.13); p.y += 0.42 / wf * cos(wf * 2.65 * p.x + time * 1.73); }
	p = abs(p) - 0.52;
	p = (floor(p * 10.6) + 0.5) / 10.6;
	p += vec2(-0.49, -0.68) * sin(length(p) * 4.98 - time * 1.65) * 0.32;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.22);
	float d = d1 * d2;
	vec3 col = palette(d * 1.73 + time * 0.18, vec3(0.57, 0.52, 0.41), vec3(0.38, 0.37, 0.33), vec3(0.86, 1.17, 1.27), vec3(0.59, 0.14, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
