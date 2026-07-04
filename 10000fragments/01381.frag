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
    vec2 hx = p * 2.57;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 19.44 - t * 2.64 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.17; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.08 - t * 2.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * 2.32 + time * 1.16) * q2;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.65));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.49 + time * 0.23, vec3(0.41, 0.59, 0.57), vec3(0.30, 0.38, 0.48), vec3(1.33, 1.23, 1.01), vec3(0.03, 0.66, 0.55));
	col = fract(col * 1.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
