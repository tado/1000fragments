uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.52;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.87)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.74 - t * 6.56 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.62; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 28.36 - t * 0.82 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.90;
    v = 0.5 * (sin(5.0 * cp.x + t * 1.75) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 1.36) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.27, lr * 1.95 + time * 0.66); }
	q2 = rot2(1.17) * q2;
	q2 = (floor(q2 * 8.8) + 0.5) / 8.8;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3 = rot2(length(q3) * 3.05 + time * 0.44) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.80);
	float d3 = fieldC(q3, time, 1.02);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.34 + time * 0.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
