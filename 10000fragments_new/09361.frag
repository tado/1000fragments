uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.28 + ph), sin(lt * 1.0 + t * 0.69)) * 0.66;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.64) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.13 * sin(mf + 3.0) + ph), cos(t * 2.09 * cos(mf + 3.0) + ph));
        ms += 0.039 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 13.9) + 0.5) / 13.9;
	q1 *= 2.58;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.67, 0.55, 1.04) + vec3(0.18, 0.13, 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
