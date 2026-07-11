uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.32 * jf)) * 0.64;
        xs += sin(length(p - im) * 131.44 - t * 4.53 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.17 + ga * 2.0 - t * 0.86 + ph);
    v = arm * exp(-gr * 0.72);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 6.50 * sin(t * 1.34) + t * 3.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1);
	q2.y += sin(q2.x * 6.09 + time * 2.80) * 0.11;
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.91; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.96);
	float d3 = fieldC(q3, time, 0.34);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.68, 1.37, 0.94) + vec3(0.01, 0.00, 0.15);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.02 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
