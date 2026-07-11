uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.41;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.92 - t * 3.74 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.99;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.37)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.59 - t * 2.81 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.36 + ph), sin(lt * 2.0 + t * 0.52)) * 0.72;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.04) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.18; q1 = rot2(2.03) * q1; }
	q1 = rot2(1.34) * q1;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.61) * 1.52));
	q2 = abs(q2);
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin((time * 0.61) * 0.61));
	q3 *= 1.0 + 0.36 * sin((time * 0.61) * 3.58);
	float d1 = fieldA(q1, (time * 0.61), 0.0);
	float d2 = fieldB(q2, (time * 0.61), 0.91);
	float d3 = fieldC(q3, (time * 0.61), 0.68);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.52, 0.50, 0.58) * (0.09 / (abs((d)) + 0.09));
	col = col / (1.0 + col);
	col *= 0.88 + 0.13 * sin(gl_FragCoord.y * 2.26 + (time * 0.61) * 14.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 1.013, 0.937) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
