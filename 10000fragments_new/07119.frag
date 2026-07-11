uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.35 + t * 5.54 + ph) + sin(p.y * 15.69 - t * 4.87 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.76 + ph), sin(lt * 2.0 + t * 1.47)) * 0.72;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 4.99 + time * 2.53) * 0.19;
	q1 = abs(q1);
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.04);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.79 + time * 0.39, vec3(0.50, 0.52, 0.56), vec3(0.31, 0.46, 0.35), vec3(1.22, 0.86, 1.19), vec3(0.63, 0.03, 0.62));
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
