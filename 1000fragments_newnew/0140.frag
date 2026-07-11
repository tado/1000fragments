uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.95 + vec2(t * 1.41, -t * 0.60) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.39 + ph), sin(lt * 1.0 + t * 0.41)) * 0.76;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.71) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.66;
	float d1 = fieldA(q1, (time * 0.60), 0.0);
	float d2 = fieldB(q2, (time * 0.60), 0.88);
	float d = min(d1, d2);
	vec3 col = vec3(0.52, 0.44, 0.44) * (0.09 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 0.89 + (time * 0.60) * 5.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.989, 1.000, 1.006) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
