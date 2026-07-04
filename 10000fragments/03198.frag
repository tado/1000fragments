uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.48; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 24.51 - t * 2.96 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.05 - t * 1.34;
    v = sin(floor(lv * 3.2) / 3.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.96;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.36 / wf * sin(wf * 3.20 * q1.y + time * 0.71); q1.y += 0.44 / wf * cos(wf * 3.27 * q1.x + time * 0.63); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.92);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.19 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
