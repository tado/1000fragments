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
    float ma = sin(length(p - vec2(0.42, 0.0)) * 24.52 - t * 2.26 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 39.73 - t * 7.53 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.82; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.93 - t * 1.81 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.95 + 0.30 * sin(t * 0.95)) + vec2(-0.79, 0.14) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(q2.y * -2.81 + time * 0.45) * q2;
	q3 += vec2(0.75, -0.21) * sin(length(q3) * 4.92 - time * 1.42) * 0.40;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.70, lr * 2.81 + time * -0.89); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.19);
	float d3 = fieldC(q3, time, 1.54);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.89 + time * 0.37, vec3(0.55, 0.51, 0.55), vec3(0.45, 0.37, 0.32), vec3(1.33, 0.84, 0.80), vec3(0.81, 0.00, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
