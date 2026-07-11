uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.49;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.21 + 0.08 * sin(t * 3.44 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.10; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.54 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2((time * 0.64) * -0.46) * q1;
	q1 = sin(q1 * 2.98 + (time * 0.64) * 1.99) * 1.29;
	q2 += vec2(-0.11, 0.37) * sin(length(q2) * 2.66 - (time * 0.64) * 2.45) * 0.34;
	float d1 = fieldA(q1, (time * 0.64), 0.0);
	float d2 = fieldB(q2, (time * 0.64), 0.18);
	float d = min(d1, d2);
	vec3 col = palette((d) * 0.92 + (time * 0.64) * 0.06, vec3(0.48, 0.50, 0.45), vec3(0.12, 0.17, 0.16), vec3(0.61, 0.87, 0.48), vec3(0.49, 0.69, 0.37));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 1.018, 0.982) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
