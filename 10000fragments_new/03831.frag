uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.95);
    float gsh = hash21(vec2(grow, floor(t * 5.46))) - 0.5;
    float gx = p.x + gsh * 0.36;
    v = sin(gx * 11.29 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.21));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.46; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.06 - t * 2.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	{ q1 = vec2(atan(q1.y, q1.x) * 2.84, length(q1) * 3.68 - time * 0.76); }
	q2 = (floor(q2 * 25.3) + 0.5) / 25.3;
	q2 += vec2(-0.42, 0.71) * sin(length(q2) * 2.85 - time * 1.26) * 0.19;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.85);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.07 + time * 0.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
