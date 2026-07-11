uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.00 + t * 3.82 + ph) + sin(p.y * 5.82 - t * 3.82 + ph)
        + sin((p.x + p.y) * 10.80 + t * 3.82 + ph) + sin(length(p) * 9.70 - t * 3.82 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 10.00 - t * 5.83 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 38.35 - t * 7.21 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.61;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.70)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 11.50 - t * 6.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.98;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.21, length(q1) * 3.26 - time * 0.44); }
	q1 = (floor(q1 * 13.7) + 0.5) / 13.7;
	{ float fr = length(q2); q2 *= 1.0 + -0.44 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.24);
	float d3 = fieldC(q3, time, 1.96);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.35, 0.73, 0.61) * (0.23 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
