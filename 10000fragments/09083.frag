uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.01 + ph), sin(lt * 5.0 + t * 1.18)) * 0.75;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.34) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.95 - t * 1.07;
    v = sin(floor(lv * 4.5) / 4.5 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(1.03) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.50);
	float d = min(d1, d2);
	vec3 col = vec3(0.54, 0.28, 0.39) * (0.10 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
