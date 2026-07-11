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
    vec2 tp = p * 4.71; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.00 - t * 2.58 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.13;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.61)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.81 - t * 2.62 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.23);
    float gsh = hash21(vec2(grow, floor(t * 5.27))) - 0.5;
    float gx = p.x + gsh * 0.59;
    v = sin(gx * 16.74 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.35));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.38 / wf * sin(wf * 3.76 * q1.y + time * 1.02); q1.y += 0.33 / wf * cos(wf * 2.19 * q1.x + time * 1.49); }
	q1 = rot2(time * 0.40) * q1;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.26);
	float d3 = fieldC(q3, time, 1.64);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = palette(d * 1.26 + time * 0.15, vec3(0.55, 0.48, 0.56), vec3(0.40, 0.39, 0.43), vec3(1.01, 1.21, 1.24), vec3(0.30, 0.86, 0.90));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
