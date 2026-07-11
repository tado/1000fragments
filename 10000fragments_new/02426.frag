uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.12, t * 1.34 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 12.54 - t * 2.69 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 8.79 - t * 7.39 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.48; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.66 - t * 1.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.62, length(q1) * 3.90 - time * 0.22); }
	q1 += vec2(0.58, -0.07) * sin(length(q1) * 2.53 - time * 1.35) * 0.35;
	q3.x += sin(q3.y * 4.48 + time * 2.00) * 0.15;
	{ float fr = length(q3); q3 *= 1.0 + 0.44 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.02);
	float d3 = fieldC(q3, time, 1.23);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.94 + time * 0.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
