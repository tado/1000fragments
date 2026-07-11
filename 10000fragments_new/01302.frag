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
    v = 0.25 * (sin(p.x * 13.02 + t * 4.66 + ph) + sin(p.y * 10.55 - t * 4.66 + ph)
        + sin((p.x + p.y) * 10.64 + t * 4.66 + ph) + sin(length(p) * 7.46 - t * 4.66 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.15; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.01 - t * 0.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	p += vec2(0.15, -0.12) * sin(length(p) * 2.36 - time * 2.29) * 0.17;
	p = abs(p);
	p = rot2(p.y * -3.40 + time * 0.83) * p;
	{ p = vec2(atan(p.y, p.x) * 2.05, length(p) * 5.14 - time * 0.24); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.99);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.91 + time * 0.13, vec3(0.46, 0.58, 0.49), vec3(0.47, 0.42, 0.33), vec3(1.03, 0.98, 0.89), vec3(0.42, 0.06, 0.78));
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 2.49 + time * 16.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
