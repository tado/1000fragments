uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    float grow = floor(p.y * 13.36);
    float gsh = hash21(vec2(grow, floor(t * 8.11))) - 0.5;
    float gx = p.x + gsh * 0.94;
    v = sin(gx * 6.37 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.85));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.80 + ph), sin(lt * 2.0 + t * 1.21)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.42) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.72 + ph), vnoise2(p * 3.72 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.72 + 3.99 * wq + vec2(1.7, 9.2) + t * 0.84),
                   vnoise2(p * 3.72 + 1.04 * wq + vec2(8.3, 2.8) - t * 0.90));
    v = vnoise2(p * 3.72 + 1.48 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q2); q2 *= 1.0 + -0.76 * fr * fr; }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3 = rot2(q3.y * -2.86 + time * 0.86) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d3 = fieldC(q3, time, 1.49);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.86));
	vec3 col = hue(d * 0.94 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
