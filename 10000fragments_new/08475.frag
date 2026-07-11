uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.54 + t * 0.61 + ph) * 0.7;
    float wb = sin(p.y * 7.25 - t * 2.28 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.25;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.72 * sin(mf + 3.0) + ph), cos(t * 2.36 * cos(mf + 3.0) + ph));
        ms += 0.056 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.68 + jf * 4.0), cos(t * 0.40 * jf)) * 0.91;
        xs += sin(length(p - im) * 212.22 - t * 5.60 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.13, -0.03) * sin(length(q1) * 3.63 - time * 1.35) * 0.25;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.04, length(q1) * 2.39 - time * 0.47); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d3 = fieldC(q3, time, 0.09);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = palette(d * 1.23 + time * 0.03, vec3(0.45, 0.49, 0.54), vec3(0.42, 0.48, 0.40), vec3(0.75, 0.95, 1.31), vec3(0.11, 0.61, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
