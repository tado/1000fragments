uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.77 + ph), sin(lt * 2.0 + t * 0.73)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.60) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.16, t * 2.23 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.46);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.41 + time * 0.12, vec3(0.58, 0.53, 0.46), vec3(0.46, 0.48, 0.47), vec3(0.94, 1.04, 0.75), vec3(0.27, 0.55, 0.23));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.99 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
