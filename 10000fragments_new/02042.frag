uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.44 + ph), sin(lt * 1.0 + t * 0.58)) * 0.65;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.01) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.52);
    float gsh = hash21(vec2(grow, floor(t * 7.54))) - 0.5;
    float gx = p.x + gsh * 0.44;
    v = sin(gx * 6.19 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.79));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.71 + t * 1.22 + ph) + sin(p.y * 7.63 - t * 1.22 + ph)
        + sin((p.x + p.y) * 9.86 + t * 1.22 + ph) + sin(length(p) * 13.29 - t * 1.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 2.23) - 0.5;
	q2 += vec2(-0.73, 0.84) * sin(length(q2) * 2.59 - time * 1.98) * 0.34;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.54, length(q2) * 2.67 - time * 0.84); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q3.x += 0.46 / wf * sin(wf * 2.32 * q3.y + time * 1.55); q3.y += 0.42 / wf * cos(wf * 3.75 * q3.x + time * 1.98); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.16);
	float d3 = fieldC(q3, time, 0.60);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.40 + time * 0.02, vec3(0.44, 0.53, 0.52), vec3(0.46, 0.44, 0.40), vec3(0.79, 0.78, 0.97), vec3(0.29, 0.20, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
