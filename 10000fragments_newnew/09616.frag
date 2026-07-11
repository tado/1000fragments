uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.43 * jf)) * 0.73;
        xs += sin(length(p - im) * 76.71 - t * 4.83 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.57 + 0.18 * pow(abs(cos(ra * 7.0 + t * 1.26)), 2.24);
    v = sin((rr - pet) * 9.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.08);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.18, 0.06), vec3(0.77, 0.79, 0.84), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
