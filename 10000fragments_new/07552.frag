uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.46;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 10.48 - t * 1.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	p += vec2(-0.27, 0.54) * sin(length(p) * 4.65 - time * 1.32) * 0.11;
	p *= 1.37;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.74 * p.y + time * 1.24); p.y += 0.38 / wf * cos(wf * 2.12 * p.x + time * 1.33); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.16, vec3(0.55, 0.43, 0.55), vec3(0.47, 0.43, 0.39), vec3(0.87, 1.13, 0.95), vec3(0.42, 0.89, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
