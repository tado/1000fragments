uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.82 * sin(mf + 3.0) + ph), cos(t * 2.30 * cos(mf + 3.0) + ph));
        ms += 0.037 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.46 + 0.20 * pow(abs(cos(ra * 7.0 + t * 2.25)), 2.31);
    v = sin((rr - pet) * 17.37 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	{ q2 = vec2(atan(q2.y, q2.x) * 1.48, length(q2) * 3.72 - time * 0.46); }
	q2 = fract(q2 * 1.79) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.26);
	float d = d1 * d2;
	vec3 col = hue(d * 0.91 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
