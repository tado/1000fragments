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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.26 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.21) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.22 + ga * 3.0 - t * 2.17 + ph);
    v = arm * exp(-gr * 0.62);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.63 + ph), vnoise2(p * 2.63 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.63 + 3.16 * wq + vec2(1.7, 9.2) + t * 1.08),
                   vnoise2(p * 2.63 + 3.62 * wq + vec2(8.3, 2.8) - t * 0.58));
    v = vnoise2(p * 2.63 + 2.98 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 1.81));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d3 = fieldC(q3, time, 0.69);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.40 + time * 0.19);
	col = mod(col * 1.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
