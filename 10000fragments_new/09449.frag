uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.71 - t * 1.92 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.18 + t * 2.12 + ph) + sin(p.y * 10.86 - t * 2.12 + ph)
        + sin((p.x + p.y) * 6.93 + t * 2.12 + ph) + sin(length(p) * 5.16 - t * 2.12 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.36; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.28 - t * 3.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = abs(q2) - 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d3 = fieldC(q3, time, 0.88);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.03 + time * 0.12, vec3(0.55, 0.47, 0.58), vec3(0.41, 0.41, 0.43), vec3(1.31, 0.78, 0.71), vec3(0.12, 0.45, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
