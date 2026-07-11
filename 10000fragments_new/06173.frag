uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.51; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 25.12 - t * 2.05 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.11 + t * 0.63 + ph) + sin(p.y * 8.77 - t * 0.63 + ph)
        + sin((p.x + p.y) * 3.65 + t * 0.63 + ph) + sin(length(p) * 12.45 - t * 0.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.58) * q1;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.31 / wf * sin(wf * 3.78 * q2.y + time * 1.90); q2.y += 0.21 / wf * cos(wf * 2.21 * q2.x + time * 1.69); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.27, lr * 2.85 + time * 0.52); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.36, 0.54), vec3(0.82, 0.80, 0.69), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
