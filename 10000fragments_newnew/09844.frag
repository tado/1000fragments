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
    float grow = floor(p.y * 7.01);
    float gsh = hash21(vec2(grow, floor(t * 6.12))) - 0.5;
    float gx = p.x + gsh * 0.34;
    v = sin(gx * 15.58 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.30));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 7.18 * sin(t * 1.28) + t * 4.03 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.22 * vnoise2(p * 2.67 + t * 0.36);
    v = sin(wr * 19.53 - t * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2.x += sin(q2.y * 6.92 + time * 1.79) * 0.38;
	q2 = rot2(0.84) * q2;
	q3 = rot2(length(q3) * 1.36 + time * 0.72) * q3;
	q3 = abs(q3);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.59);
	float d3 = fieldC(q3, time, 0.61);
	d2 = d2 * d3;
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.02 + time * 0.04);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
