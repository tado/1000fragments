uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.38 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.17) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.59 + 0.14 * sin(t * 1.21)) + vec2(-0.46, -0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 2.53, t * 0.64)) - 0.5) * 0.59;
    v = exp(-abs(bx) * 6.14) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.87, length(q1) * 2.32 - time * 0.68); }
	q1 = (floor(q1 * 11.8) + 0.5) / 11.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d3 = fieldC(q3, time, 0.76);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.48));
	vec3 col = palette(d * 1.25 + time * 0.13, vec3(0.55, 0.44, 0.53), vec3(0.49, 0.46, 0.32), vec3(0.78, 0.74, 1.21), vec3(0.03, 0.67, 0.19));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
