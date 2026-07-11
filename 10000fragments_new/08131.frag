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
    vec2 zp = p * 6.42;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.47)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.34 - t * 6.14 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.98, t * 2.45 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.31 + ph), sin(lt * 4.0 + t * 0.72)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(time * -0.71) * q2;
	q3 += vec2(-0.38, -0.87) * sin(length(q3) * 5.43 - time * 1.81) * 0.25;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.16);
	float d3 = fieldC(q3, time, 0.20);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = palette(d * 1.07 + time * 0.27, vec3(0.53, 0.58, 0.59), vec3(0.49, 0.48, 0.47), vec3(1.07, 1.34, 1.40), vec3(0.83, 0.61, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
