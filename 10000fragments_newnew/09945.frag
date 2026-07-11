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

float fieldA(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.28 * vnoise2(p * 5.23 + t * 0.92);
    v = sin(wr * 22.45 - t * 2.59 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.44);
    float gsh = hash21(vec2(grow, floor(t * 9.66))) - 0.5;
    float gx = p.x + gsh * 1.14;
    v = sin(gx * 8.83 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.84));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.49 / wf * sin(wf * 1.63 * q1.y + time * 0.79); q1.y += 0.36 / wf * cos(wf * 2.81 * q1.x + time * 1.50); }
	q1 *= 2.51;
	q2 = rot2(length(q2) * 2.26 + time * 0.58) * q2;
	q2.y += sin(q2.x * 4.87 + time * 3.30) * 0.29;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d = min(d1, d2);
	vec3 col = vec3(0.70, 0.67, 0.20) * (0.11 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.86 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
