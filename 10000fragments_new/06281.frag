uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.43);
    float gsh = hash21(vec2(grow, floor(t * 9.66))) - 0.5;
    float gx = p.x + gsh * 1.01;
    v = sin(gx * 16.03 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.71));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.43; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.40 - t * 3.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.66;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.41 / wf * sin(wf * 2.45 * q2.y + time * 1.76); q2.y += 0.34 / wf * cos(wf * 1.79 * q2.x + time * 0.76); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.90 + time * 0.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
