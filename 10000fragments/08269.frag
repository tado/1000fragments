uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.74;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.92 - t * 5.33 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.57;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.29 + 0.07 * sin(t * 2.11 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.51; }
	q1 = rot2(0.71) * q1;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 2.23));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.92);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.66 + time * 0.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
