uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.17);
    float gsh = hash21(vec2(grow, floor(t * 6.80))) - 0.5;
    float gx = p.x + gsh * 1.05;
    v = sin(gx * 15.79 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.30));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.34 - t * 7.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.58;
	q1 = rot2(length(q1) * 3.58 + time * 1.27) * q1;
	q2 = rot2(1.66) * q2;
	{ float fr = length(q2); q2 *= 1.0 + 0.60 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.36, 0.97, 0.90) * (0.08 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = mod(col * 1.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
