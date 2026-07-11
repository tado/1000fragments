uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.73 + sin(p.y * 2.61 + t * 2.61) * 1.44 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.55);
    float gsh = hash21(vec2(grow, floor(t * 7.06))) - 0.5;
    float gx = p.x + gsh * 1.13;
    v = sin(gx * 15.10 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.61));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.79) * q1;
	{ float fr = length(q1); q1 *= 1.0 + -0.36 * fr * fr; }
	{ q2 = vec2(atan(q2.y, q2.x) * 2.60, length(q2) * 4.25 - time * 0.63); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.28 + time * 0.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
