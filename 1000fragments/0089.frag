uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.96 + t * 0.31) - 0.5) * 2.0;
    v = sin((p.y * 7.79 + zx * 0.87 + t * 2.39) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.39);
    float gsh = hash21(vec2(grow, floor(t * 7.34))) - 0.5;
    float gx = p.x + gsh * 1.03;
    v = sin(gx * 8.47 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.37));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.10; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 21.28 - t * 1.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * -1.96 + time * 1.08) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.44);
	float d3 = fieldC(q3, time, 1.38);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.12 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
