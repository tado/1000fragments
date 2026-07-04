uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 5.54 * sin(t * 1.43) + t * 2.11 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.93; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 26.49 - t * 1.09 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.10 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.61 + t * 1.23 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 3.44 + time * 1.41) * q1;
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 1.00;
	q3 = rot2(length(q3) * -1.07 + time * 0.41) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.28);
	float d3 = fieldC(q3, time, 1.49);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.11 + time * 0.67);
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
