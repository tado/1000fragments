uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.25; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 26.22 - t * 1.18 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.74;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.39)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.04 - t * 7.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(-0.97, 0.57) * sin(length(q2) * 5.40 - time * 2.07) * 0.17;
	q2 = (floor(q2 * 15.2) + 0.5) / 15.2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.14);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.80 + time * 0.15, vec3(0.49, 0.58, 0.57), vec3(0.32, 0.35, 0.48), vec3(1.20, 0.83, 0.99), vec3(0.69, 0.66, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
