uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 10.00; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.17 - t * 0.60 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.83 + ph), sin(lt * 3.0 + t * 0.94)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.36) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.99 * sin(mf + 3.0) + ph), cos(t * 1.65 * cos(mf + 3.0) + ph));
        ms += 0.051 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.72;
	q2 = (floor(q2 * 6.5) + 0.5) / 6.5;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.68, length(q2) * 2.74 - time * 0.80); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.54);
	float d3 = fieldC(q3, time, 1.07);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette(d * 1.39 + time * 0.30, vec3(0.57, 0.42, 0.46), vec3(0.43, 0.31, 0.37), vec3(0.99, 1.26, 0.78), vec3(0.24, 0.28, 0.33));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
