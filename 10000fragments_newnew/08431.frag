uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.29 * pow(abs(cos(ra * 5.0 + t * 2.31)), 2.92);
    v = sin((rr - pet) * 22.35 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.62 + t * 3.27 + ph) + sin(p.y * 11.62 - t * 3.27 + ph)
        + sin((p.x + p.y) * 7.53 + t * 3.27 + ph) + sin(length(p) * 13.23 - t * 3.27 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.62 + 0.31 * sin(t * 0.42)) + vec2(-0.69, 0.01) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.76;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.81;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.44 / wf * sin(wf * 3.90 * q2.y + time * 1.31); q2.y += 0.50 / wf * cos(wf * 1.71 * q2.x + time * 1.68); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q3.x += 0.37 / wf * sin(wf * 3.16 * q3.y + time * 1.14); q3.y += 0.34 / wf * cos(wf * 1.65 * q3.x + time * 1.03); }
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.32; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.89);
	float d3 = fieldC(q3, time, 0.69);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.48 + time * 0.27, vec3(0.57, 0.50, 0.53), vec3(0.40, 0.32, 0.40), vec3(1.10, 1.24, 0.86), vec3(0.64, 0.23, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
