uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.77 + ph), sin(lt * 2.0 + t * 1.36)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.03) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.57 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.28 + t * 3.96 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.45 + 0.31 * sin(t * 1.40)) + vec2(-0.60, -0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 23; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 23.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q2); q2 *= 1.0 + -0.37 * fr * fr; }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.44, length(q2) * 3.51 - time * 0.67); }
	q3 = sin(q3 * 1.67 + time * 2.28) * 0.82;
	q3 = rot2(length(q3) * 2.39 + time * 1.41) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d3 = fieldC(q3, time, 1.88);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.48 + time * 0.11, vec3(0.48, 0.47, 0.52), vec3(0.41, 0.39, 0.33), vec3(0.89, 0.71, 0.97), vec3(0.90, 0.95, 0.53));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
