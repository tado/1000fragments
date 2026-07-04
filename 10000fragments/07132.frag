uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.08 + 0.42 * sin(t * 1.09)) + vec2(-0.52, 0.28) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 22; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 22.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.82, t * 2.03 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.39 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * 2.58 + time * 0.43) * q1;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.33 / wf * sin(wf * 3.28 * q1.y + time * 1.47); q1.y += 0.40 / wf * cos(wf * 1.63 * q1.x + time * 1.32); }
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.90;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.44, lr * 1.73 + time * -0.36); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d3 = fieldC(q3, time, 1.11);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.80 + time * 0.09, vec3(0.55, 0.50, 0.46), vec3(0.44, 0.33, 0.39), vec3(0.83, 1.37, 0.87), vec3(0.20, 0.37, 0.52));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
