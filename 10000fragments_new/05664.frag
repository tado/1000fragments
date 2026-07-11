uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.39 + ph), sin(lt * 1.0 + t * 1.34)) * 0.79;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.38) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.99; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.95 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	p = (floor(p * 12.8) + 0.5) / 12.8;
	p.x += sin(p.y * 7.40 + time * 1.45) * 0.10;
	p = rot2(p.y * -2.89 + time * 0.63) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.65 * p.y + time * 1.63); p.y += 0.33 / wf * cos(wf * 1.70 * p.x + time * 0.97); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.94 + time * 0.21, vec3(0.53, 0.42, 0.56), vec3(0.42, 0.48, 0.39), vec3(1.16, 1.05, 1.21), vec3(0.50, 0.98, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
