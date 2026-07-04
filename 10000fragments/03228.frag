uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.48 + t * 4.55 + ph) + sin(p.y * 2.37 - t * 4.55 + ph)
        + sin((p.x + p.y) * 10.23 + t * 4.55 + ph) + sin(length(p) * 4.26 - t * 4.55 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.28 + ga * 4.0 - t * 2.61 + ph);
    v = arm * exp(-gr * 0.75);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.10;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.0 + 0.13 * sin(time * 2.57);
	{ float fr = length(q2); q2 *= 1.0 + -0.77 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 2.00);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.40 + time * 0.34);
	col *= 0.80 + 0.18 * sin(gl_FragCoord.y * 1.26 + time * 14.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
