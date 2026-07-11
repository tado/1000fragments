uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.33 * sin(mf + 3.0) + ph), cos(t * 2.33 * cos(mf + 3.0) + ph));
        ms += 0.032 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.19 * cos(sa * 3 + t * 1.58 + ph);
    v = sin((sr - petal) * 13.78);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 3.17;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.92 * p.y + time * 1.08); p.y += 0.32 / wf * cos(wf * 3.38 * p.x + time * 1.53); }
	p = rot2(0.77) * p;
	{ p = vec2(atan(p.y, p.x) * 1.98, length(p) * 3.67 - time * 0.68); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.10 + time * 0.21, vec3(0.54, 0.43, 0.48), vec3(0.35, 0.49, 0.46), vec3(1.18, 0.89, 1.27), vec3(0.54, 0.00, 0.40));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
