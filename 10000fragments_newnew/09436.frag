uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.26 + t * 2.51 + ph) + sin(p.y * 4.22 - t * 5.76 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.07);
    float gsh = hash21(vec2(grow, floor(t * 2.71))) - 0.5;
    float gx = p.x + gsh * 0.34;
    v = sin(gx * 19.53 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.00));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.66 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.11) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.31;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d3 = fieldC(q3, time, 1.65);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.19 + time * 0.38, vec3(0.50, 0.56, 0.46), vec3(0.40, 0.35, 0.35), vec3(0.99, 1.07, 1.05), vec3(0.85, 0.13, 0.30));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
