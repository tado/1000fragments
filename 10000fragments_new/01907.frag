uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.04; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 9.82 - t * 3.40 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.36 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.26 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.43) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.53; p = rot2(2.16) * p; }
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	p.x += sin(p.y * 4.78 + time * 1.80) * 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = d1 * d2;
	vec3 col = palette(d * 1.02 + time * 0.07, vec3(0.59, 0.48, 0.48), vec3(0.49, 0.36, 0.32), vec3(1.02, 0.86, 1.04), vec3(0.09, 0.81, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
