uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
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
    vec2 wq = vec2(vnoise2(p * 1.65 + ph), vnoise2(p * 1.65 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.65 + 1.87 * wq + vec2(1.7, 9.2) + t * 0.78),
                   vnoise2(p * 1.65 + 2.04 * wq + vec2(8.3, 2.8) - t * 0.65));
    v = vnoise2(p * 1.65 + 1.75 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.24 * pow(abs(cos(ra * 6.0 + t * 1.93)), 2.96);
    v = sin((rr - pet) * 13.06 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.46; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.90 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * 1.23) * q1;
	q1 = rot2(0.85) * q1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 = rot2(length(q2) * -1.85 + time * 1.13) * q2;
	q3 = rot2(3.01) * q3;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q3.x += 0.32 / wf * sin(wf * 3.97 * q3.y + time * 1.73); q3.y += 0.31 / wf * cos(wf * 1.69 * q3.x + time * 0.92); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.69);
	float d3 = fieldC(q3, time, 1.13);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.95 + time * 0.11, vec3(0.41, 0.59, 0.56), vec3(0.32, 0.34, 0.33), vec3(1.24, 1.18, 1.23), vec3(0.10, 0.65, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
