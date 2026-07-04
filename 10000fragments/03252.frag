uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.36;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.00); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.57, rv + 0.09 * sin(t * 1.05 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.60; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.18 - t * 3.60 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2) - 0.55;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.51);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.34 + time * 0.12, vec3(0.42, 0.50, 0.56), vec3(0.48, 0.34, 0.39), vec3(1.31, 0.98, 0.80), vec3(0.18, 0.10, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
