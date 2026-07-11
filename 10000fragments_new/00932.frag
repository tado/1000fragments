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
    vec2 tp = p * 4.53; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 24.62 - t * 1.28 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.93 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.24 + t * 3.07 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -2.60 + time * 0.88) * p;
	{ float fr = length(p); p *= 1.0 + -0.22 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = d1 + d2;
	vec3 col = palette(d * 1.31 + time * 0.12, vec3(0.43, 0.44, 0.54), vec3(0.38, 0.50, 0.39), vec3(1.29, 1.34, 1.13), vec3(0.89, 0.29, 0.71));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
