uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.00;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 10.73 - t * 3.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.73 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.37 + t * 2.13 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	{ float fr = length(p); p *= 1.0 + 0.65 * fr * fr; }
	p = rot2(p.y * 2.38 + time * 0.48) * p;
	p = rot2(length(p) * 2.17 + time * 0.50) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.64);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.33 + time * 0.08, vec3(0.51, 0.45, 0.59), vec3(0.40, 0.46, 0.35), vec3(1.28, 1.30, 0.88), vec3(0.44, 0.81, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
