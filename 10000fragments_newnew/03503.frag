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
    float grow = floor(p.y * 11.28);
    float gsh = hash21(vec2(grow, floor(t * 4.98))) - 0.5;
    float gx = p.x + gsh * 0.71;
    v = sin(gx * 8.17 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.48));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.79 + ph), vnoise2(p * 2.79 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.79 + 1.26 * wq + vec2(1.7, 9.2) + t * 0.43),
                   vnoise2(p * 2.79 + 3.25 * wq + vec2(8.3, 2.8) - t * 0.62));
    v = vnoise2(p * 2.79 + 2.97 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(2.58) * q1;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.43 / wf * sin(wf * 1.77 * q2.y + time * 2.16); q2.y += 0.48 / wf * cos(wf * 2.72 * q2.x + time * 1.72); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.79);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.12));
	vec3 col = hue(d * 1.04 + time * 0.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
