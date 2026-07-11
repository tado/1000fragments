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
    float zx = abs(fract(p.x * 1.23 + t * 0.60) - 0.5) * 2.0;
    v = sin((p.y * 5.61 + zx * 0.80 + t * 2.67) * 3.1415927 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.18; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.89 - t * 0.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.39;
	p *= 1.59;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -1.55 + time * 0.37) * p;
	p += vec2(-0.98, -0.95) * sin(length(p) * 4.99 - time * 2.23) * 0.30;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.35);
	float d = d1 * d2;
	vec3 col = palette(d * 1.22 + time * 0.01, vec3(0.56, 0.55, 0.55), vec3(0.32, 0.42, 0.41), vec3(1.30, 1.10, 1.01), vec3(0.11, 0.52, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
