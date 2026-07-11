uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 39.05 - t * 1.81 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 24.19 - t * 5.51 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.29;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.70 - t * 1.02 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.80 + ph), sin(lt * 5.0 + t * 0.93)) * 0.85;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.98) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.35;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * 1.33) * q1;
	{ float fr = length(q2); q2 *= 1.0 + 0.30 * fr * fr; }
	q2.x += sin(q2.y * 7.46 + time * 3.64) * 0.39;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d3 = fieldC(q3, time, 1.83);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.27, 0.27), vec3(0.65, 0.57, 0.65), cc);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
