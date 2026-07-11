uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.97 + sin(p.y * 2.51 + t * 5.83) * 1.34 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.26 + t * 1.57 + ph) + sin(p.y * 12.78 - t * 4.31 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.49 + jf * 4.0), cos(t * 0.50 * jf)) * 0.72;
        xs += sin(length(p - im) * 154.70 - t * 4.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2.x += sin(q2.y * 7.67 + time * 3.77) * 0.15;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.14);
	float d3 = fieldC(q3, time, 0.20);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = palette(d * 1.28 + time * 0.18, vec3(0.44, 0.46, 0.57), vec3(0.36, 0.37, 0.35), vec3(1.06, 1.29, 0.81), vec3(0.11, 0.16, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
