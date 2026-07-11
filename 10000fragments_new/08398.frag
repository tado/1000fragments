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
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.46 + ph), sin(lt * 3.0 + t * 1.42)) * 0.89;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.51) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.07; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.21 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.18) * q1;
	q2 *= 2.87;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.79));
	vec3 col = palette(d * 0.97 + time * 0.18, vec3(0.50, 0.51, 0.58), vec3(0.39, 0.49, 0.40), vec3(1.24, 1.34, 0.83), vec3(0.55, 0.93, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
