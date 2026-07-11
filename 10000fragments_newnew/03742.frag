uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.17 * vnoise2(p * 5.42 + t * 0.62);
    v = sin(wr * 29.60 - t * 1.59 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.96 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.16 + t * 3.84 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.62; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.82 - t * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.35));
	for(int fo = 0; fo < 5; fo++){ q3 = abs(q3) - 0.47; q3 = rot2(1.55) * q3; }
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 1.04));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.53);
	float d3 = fieldC(q3, time, 0.64);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.67, 0.71, 0.84) * (0.07 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
