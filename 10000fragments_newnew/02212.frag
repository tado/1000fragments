uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.22 * cos(sa * 6.0 + t * 1.61 + ph);
    v = sin((sr - petal) * 18.30);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.32 + t * 0.76 + ph) + sin(p.y * 7.34 - t * 0.76 + ph)
        + sin((p.x + p.y) * 10.91 + t * 0.76 + ph) + sin(length(p) * 13.40 - t * 0.76 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.71; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 29.45 - t * 2.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.62, length(q1) * 4.03 - time * 0.30); }
	q1 = rot2(time * 0.68) * q1;
	q3 = rot2(length(q3) * -2.65 + time * 0.64) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.98);
	float d3 = fieldC(q3, time, 0.40);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.56, 0.34, 0.72) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
