uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.38 + t * 2.26 + ph) * 0.7;
    float wb = sin(p.y * 12.61 - t * 2.82 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.80;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.79 + ph), sin(lt * 1.0 + t * 1.38)) * 0.81;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.81) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.15 + time * 0.21, vec3(0.41, 0.46, 0.55), vec3(0.32, 0.31, 0.31), vec3(1.26, 0.81, 1.03), vec3(0.96, 0.83, 0.17));
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
