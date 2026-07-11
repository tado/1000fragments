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

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.45 + ph), sin(lt * 4.0 + t * 1.47)) * 0.76;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.39) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.43; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.92 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.60) * q1;
	q1 = (floor(q1 * 27.5) + 0.5) / 27.5;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.12));
	vec3 col = palette(d * 0.48 + time * 0.09, vec3(0.57, 0.43, 0.59), vec3(0.40, 0.43, 0.40), vec3(1.38, 1.27, 1.32), vec3(0.30, 0.69, 0.59));
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 1.68 + time * 17.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
