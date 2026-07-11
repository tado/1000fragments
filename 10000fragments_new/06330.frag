uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.67 + 0.39 * sin(t * 0.99)) + vec2(-0.37, 0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.23 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.30) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.49;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.94)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.89 - t * 4.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.38 / wf * sin(wf * 2.65 * q2.y + time * 0.77); q2.y += 0.39 / wf * cos(wf * 1.60 * q2.x + time * 0.91); }
	q2 *= 1.31;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.87);
	float d3 = fieldC(q3, time, 1.10);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.21 + time * 0.36, vec3(0.52, 0.54, 0.52), vec3(0.35, 0.31, 0.37), vec3(1.29, 0.91, 1.19), vec3(0.17, 0.50, 0.88));
	col *= 0.90 + 0.17 * sin(gl_FragCoord.y * 1.58 + time * 12.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
