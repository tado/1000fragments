uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.97 + jf * 4.0), cos(t * 0.51 * jf)) * 0.95;
        xs += sin(length(p - im) * 65.17 - t * 8.43 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.49 * sin(mf + 3.0) + ph), cos(t * 1.08 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.31));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.78 + time * 0.29, vec3(0.58, 0.40, 0.50), vec3(0.44, 0.34, 0.47), vec3(0.81, 0.70, 0.83), vec3(0.06, 0.88, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
