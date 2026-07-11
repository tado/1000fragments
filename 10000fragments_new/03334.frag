uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 3.96 * sin(t * 1.20) + t * 2.62 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.11 * jf)) * 0.83;
        xs += sin(length(p - im) * 185.33 - t * 4.73 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.41 / wf * sin(wf * 1.76 * q1.y + time * 0.60); q1.y += 0.37 / wf * cos(wf * 2.23 * q1.x + time * 1.01); }
	{ float fr = length(q1); q1 *= 1.0 + 0.40 * fr * fr; }
	q2 += vec2(0.37, 0.06) * sin(length(q2) * 2.76 - time * 2.42) * 0.19;
	{ float fr = length(q2); q2 *= 1.0 + -0.70 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.63);
	float d = d1 * d2;
	vec3 col = palette(d * 0.43 + time * 0.37, vec3(0.60, 0.44, 0.58), vec3(0.34, 0.41, 0.32), vec3(0.95, 0.87, 1.17), vec3(0.28, 0.52, 0.34));
	col = mod(col * 2.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
