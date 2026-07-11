uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.16 * cos(sa * 7.0 + t * 1.38 + ph);
    v = sin((sr - petal) * 17.90);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.98 - t * 4.93 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 12.97 - t * 1.20 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 27.02 - t * 5.73 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 += vec2(-0.90, -0.19) * sin(length(q2) * 4.81 - time * 2.34) * 0.36;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.75);
	float d3 = fieldC(q3, time, 0.79);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.60, 0.83, 0.84) * (0.11 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
