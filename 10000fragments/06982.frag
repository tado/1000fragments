uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.74;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.25)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.30 - t * 6.80 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.91 + ph), sin(lt * 1.0 + t * 0.54)) * 0.94;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -0.80) * q1;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.83, lr * 1.88 + time * -0.36); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.28));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.20);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.16, 0.08), vec3(0.84, 0.90, 0.74), cc);
	col = fract(col * 1.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
