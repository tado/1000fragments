uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.84 + ph), sin(lt * 3.0 + t * 0.75)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.48) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.21 + sin(p.y * 3.16 + t * 5.31) * 2.68 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.22;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.20) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 2.12) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 0.88));
	q3.x += sin(q3.y * 6.78 + time * 1.75) * 0.15;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.14);
	float d3 = fieldC(q3, time, 1.33);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.47 + time * 0.13);
	col = fract(col * 2.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
