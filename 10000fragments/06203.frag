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
    vec2 tp = p * 8.90; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 21.19 - t * 2.37 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.27 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.28 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.97) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.41;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.53) * q1;
	q1 *= 1.0 + 0.40 * sin(time * 3.76);
	q2 = rot2(q2.y * -3.64 + time * 1.02) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.20);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.47));
	vec3 col = palette(d * 0.89 + time * 0.37, vec3(0.45, 0.40, 0.41), vec3(0.45, 0.38, 0.34), vec3(0.71, 0.83, 1.09), vec3(0.66, 0.71, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
