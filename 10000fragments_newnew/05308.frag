uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.25 + ga * 2.0 - t * 2.60 + ph);
    v = arm * exp(-gr * 1.08);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.35 + t * 1.43) - 0.5) * 2.0;
    v = sin((p.y * 4.92 + zx * 0.61 + t * 2.03) * 3.1415927 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 2.08 * sin(t * 0.79) + t * 5.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.86;
	q1 *= 1.0 + 0.16 * sin(time * 4.62);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.23);
	float d3 = fieldC(q3, time, 0.38);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = hue(d * 0.82 + time * 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
