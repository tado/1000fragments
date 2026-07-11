uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.25 + ph), sin(lt * 1.0 + t * 1.43)) * 0.65;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.74) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.89 + ph), sin(lt * 4.0 + t * 1.44)) * 0.78;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.15) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * -2.95 + time * 0.82) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.95);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.91));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.09 + time * 0.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
