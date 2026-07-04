uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.08 + ga * 4.0 - t * 2.53 + ph);
    v = arm * exp(-gr * 1.14);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.61; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.81 - t * 2.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 4.95 + time * 1.53) * 0.12;
	q1 = fract(q1 * 1.64) - 0.5;
	q2 = rot2(length(q2) * -2.65 + time * 0.95) * q2;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.95;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.87);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.07 + time * 0.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
