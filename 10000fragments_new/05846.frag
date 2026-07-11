uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.60 * jf)) * 0.44;
        xs += sin(length(p - im) * 171.57 - t * 9.91 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.68 * sin(mf + 3.0) + ph), cos(t * 1.00 * cos(mf + 3.0) + ph));
        ms += 0.073 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.05 + t * 1.02 + ph) * 0.7;
    float wb = sin(p.y * 18.92 - t * 3.62 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.61;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.27;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.22 * fr * fr; }
	q2 += vec2(-0.64, -0.40) * sin(length(q2) * 2.42 - time * 1.47) * 0.34;
	q2 = abs(q2);
	q3 *= 2.72;
	q3 = (floor(q3 * 8.2) + 0.5) / 8.2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.15);
	float d3 = fieldC(q3, time, 0.36);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.25 + time * 0.11, vec3(0.58, 0.47, 0.59), vec3(0.47, 0.45, 0.31), vec3(1.38, 0.77, 0.94), vec3(0.55, 0.16, 0.62));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
