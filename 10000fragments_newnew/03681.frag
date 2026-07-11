uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.65, t * 2.19)) - 0.5) * 1.49;
    v = exp(-abs(bx) * 4.40) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.06 + ph), sin(lt * 2.0 + t * 1.05)) * 0.78;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.02) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.32 / wf * sin(wf * 3.11 * q1.y + time * 0.78); q1.y += 0.29 / wf * cos(wf * 1.95 * q1.x + time * 1.19); }
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.63));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.14);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.84 + time * 0.09, vec3(0.48, 0.51, 0.40), vec3(0.37, 0.42, 0.48), vec3(1.38, 0.94, 0.95), vec3(0.74, 0.74, 0.92));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.17 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
