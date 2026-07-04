uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.60 + t * 3.72 + ph) + sin(p.y * 4.68 - t * 0.80 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.47;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 14.06 - t * 1.32 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.02, lr * 2.91 + time * 0.57); }
	q2 = rot2(time * 0.75) * q2;
	q2 = sin(q2 * 1.21 + time * 0.93) * 1.49;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.15, 0.09), vec3(0.89, 0.87, 0.89), cc);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
