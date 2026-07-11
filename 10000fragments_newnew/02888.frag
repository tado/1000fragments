uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.30 + ga * 4.0 - t * 2.52 + ph);
    v = arm * exp(-gr * 1.06);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.09 + t * 1.11 + ph) * 0.7;
    float wb = sin(p.y * 13.70 - t * 3.56 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.56;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = sin(q2 * 2.69 + time * 0.94) * 1.42;
	q2 = fract(q2 * 2.98) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.87);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.91));
	vec3 col = vec3(0.32, 0.68, 0.50) * (0.23 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
