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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.50;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.78); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.46, 0.52, rv + 0.07 * sin(t * 2.15 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.35;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.26 + 0.10 * sin(t * 2.89 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.99 + ph), vnoise2(p * 3.99 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.99 + 1.40 * wq + vec2(1.7, 9.2) + t * 1.07),
                   vnoise2(p * 3.99 + 2.42 * wq + vec2(8.3, 2.8) - t * 0.62));
    v = vnoise2(p * 3.99 + 1.31 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * -2.91 + time * 0.93) * q1;
	q2 *= 1.0 + 0.37 * sin(time * 3.04);
	q2 = abs(q2);
	q3 = rot2(time * 1.26) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.67);
	float d3 = fieldC(q3, time, 1.74);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.55 + time * 0.37);
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
