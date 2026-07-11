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
    vec2 tp = p * 8.95; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 18.34 - t * 3.00 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.77 + sin(p.y * 4.91 + t * 2.19) * 3.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.19) * q1;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.41; q1 = rot2(1.93) * q1; }
	q2 *= 1.90;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.21);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.07 + time * 0.04, vec3(0.41, 0.47, 0.56), vec3(0.34, 0.32, 0.46), vec3(0.74, 1.26, 1.01), vec3(1.00, 0.43, 0.80));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
