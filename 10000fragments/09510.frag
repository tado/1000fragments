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
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.35 + ph), sin(lt * 3.0 + t * 1.43)) * 0.86;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.27) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.28;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.93)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 17.58 - t * 4.53 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.87 + t * 1.15) - 0.5) * 2.0;
    v = sin((p.y * 2.04 + zx * 0.67 + t * 0.89) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = sin(q3 * 1.25 + time * 2.47) * 1.29;
	for(int fo = 0; fo < 5; fo++){ q3 = abs(q3) - 0.22; q3 = rot2(1.00) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d3 = fieldC(q3, time, 1.75);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.22 + time * 0.08, vec3(0.54, 0.54, 0.57), vec3(0.32, 0.45, 0.49), vec3(1.18, 1.19, 0.76), vec3(0.99, 0.44, 0.41));
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
