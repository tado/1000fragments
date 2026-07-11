uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.88 + jf * 4.0), cos(t * 0.41 * jf)) * 0.67;
        xs += sin(length(p - im) * 152.08 - t * 9.98 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.97 + vec2(t * 1.80, -t * 1.94) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 19.3) + 0.5) / 19.3;
	q2 *= 2.86;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.64);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.70 + time * 0.05, vec3(0.44, 0.51, 0.52), vec3(0.43, 0.46, 0.48), vec3(1.22, 1.02, 0.88), vec3(0.19, 0.83, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
