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
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.37 + ph), sin(lt * 5.0 + t * 0.89)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.03) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.97 + t * 2.34 + ph) + sin(p.y * 9.75 - t * 2.34 + ph)
        + sin((p.x + p.y) * 11.87 + t * 2.34 + ph) + sin(length(p) * 16.13 - t * 2.34 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.57, length(q2) * 5.35 - time * 0.97); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.67);
	float d = d1 * d2;
	vec3 col = hue(d * 1.42 + time * 0.31);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
