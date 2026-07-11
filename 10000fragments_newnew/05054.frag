uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.38 + ph), sin(lt * 3.0 + t * 0.59)) * 0.97;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.83) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.40 + t * 2.08 + ph) + sin(p.y * 8.42 - t * 2.70 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 0.64));
	q1 = rot2(2.07) * q1;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.57; }
	q2 += vec2(0.61, 0.34) * sin(length(q2) * 5.87 - time * 0.81) * 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.97 + time * 0.14, vec3(0.50, 0.42, 0.55), vec3(0.38, 0.47, 0.42), vec3(1.38, 0.95, 0.95), vec3(0.24, 0.46, 0.51));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
