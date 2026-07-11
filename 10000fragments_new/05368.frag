uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.41; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.20 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 31.35 - t * 1.20 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 27.03 - t * 3.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 1.20 + time * 0.94) * q1;
	q1 = fract(q1 * 2.93) - 0.5;
	q2.y += sin(q2.x * 7.70 + time * 1.73) * 0.40;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.73);
	float d = d1 * d2;
	vec3 col = hue(d * 1.00 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
