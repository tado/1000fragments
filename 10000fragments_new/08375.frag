uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.08);
    float gsh = hash21(vec2(grow, floor(t * 2.26))) - 0.5;
    float gx = p.x + gsh * 0.77;
    v = sin(gx * 9.69 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.40));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.68; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.92 - t * 3.19 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.20 * pow(abs(cos(ra * 5.0 + t * 2.02)), 2.84);
    v = sin((rr - pet) * 13.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.21 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.16; q1 = rot2(0.98) * q1; }
	q2 = rot2(1.70) * q2;
	q2 = rot2(time * -1.47) * q2;
	q3 += vec2(-0.10, -0.74) * sin(length(q3) * 5.38 - time * 1.40) * 0.20;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.90, length(q3) * 2.79 - time * 0.96); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.61);
	float d3 = fieldC(q3, time, 0.54);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.62));
	vec3 col = palette(d * 0.83 + time * 0.01, vec3(0.56, 0.59, 0.56), vec3(0.44, 0.46, 0.43), vec3(1.06, 1.30, 0.96), vec3(0.47, 0.23, 0.06));
	col = mod(col * 1.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
