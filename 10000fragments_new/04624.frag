uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.55 + t * 2.20 + ph) * 0.7;
    float wb = sin(p.y * 5.35 - t * 3.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.74;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 7.44 * sin(t * 0.64) + t * 5.76 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.62 + t * 2.96 + ph) * 0.7;
    float wb = sin(p.y * 8.27 - t * 2.46 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.60;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.95);
	float d3 = fieldC(q3, time, 0.67);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.22 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
