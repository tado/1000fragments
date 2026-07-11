uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.31 + t * 0.82 + ph) + sin(p.y * 3.41 - t * 1.10 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.25 + ph), sin(lt * 3.0 + t * 0.63)) * 0.77;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.25) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.44;
	q1 *= 2.43;
	q2 = sin(q2 * 2.16 + time * 1.87) * 0.68;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.52; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.79, 0.38, 0.31) * (0.20 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
