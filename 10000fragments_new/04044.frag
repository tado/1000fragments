uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.06 + ph), sin(lt * 1.0 + t * 0.96)) * 0.86;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.74) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.42);
    float gsh = hash21(vec2(grow, floor(t * 8.12))) - 0.5;
    float gx = p.x + gsh * 0.58;
    v = sin(gx * 15.34 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.74));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.18, lr * 2.46 + time * -0.44); }
	q1 *= 2.93;
	q2 = fract(q2 * 1.47) - 0.5;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.45, lr * 2.62 + time * -0.76); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.52);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.02, 0.02), vec3(0.86, 0.98, 0.99), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
