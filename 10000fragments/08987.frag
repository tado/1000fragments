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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.24 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.06); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.41 - t * 8.57 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.76; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 21.64 - t * 3.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.42));
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.40 / wf * sin(wf * 2.64 * q1.y + time * 1.24); q1.y += 0.32 / wf * cos(wf * 2.52 * q1.x + time * 0.66); }
	q2 = (floor(q2 * 19.7) + 0.5) / 19.7;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.50; }
	{ q3 = vec2(atan(q3.y, q3.x) * 2.05, length(q3) * 3.52 - time * 0.41); }
	for(int fo = 0; fo < 4; fo++){ q3 = abs(q3) - 0.16; q3 = rot2(1.83) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.00);
	float d3 = fieldC(q3, time, 0.73);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.62 + time * 0.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
