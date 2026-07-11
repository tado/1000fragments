uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.57 * sin(mf + 3.0) + ph), cos(t * 1.66 * cos(mf + 3.0) + ph));
        ms += 0.056 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.47 - t * 1.94;
    v = sin(floor(lv * 4.5) / 4.5 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.59;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 2.20 + time * 1.39) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.23, length(q2) * 3.82 - time * 0.22); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.22);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.84, 0.72, 0.72) + vec3(0.19, 0.04, 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
