uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.60 + t * 3.58 + ph) * 0.7;
    float wb = sin(p.y * 13.58 - t * 3.93 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.63;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.99 + ph), sin(lt * 5.0 + t * 1.18)) * 0.71;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.79) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	vec2 q1 = p; vec2 q2 = p;
	q2.x += sin(q2.y * 7.98 + time * 1.52) * 0.22;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 2.00);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.71, 1.25, 1.04) + vec3(0.01, 0.10, 0.25);
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 2.59 + time * 9.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
