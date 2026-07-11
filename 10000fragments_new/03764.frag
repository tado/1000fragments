uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.65;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 21.63 - t * 3.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -2.24 + time * 1.13) * p;
	p *= 3.10;
	p = rot2(1.08) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.19, vec3(0.56, 0.51, 0.44), vec3(0.30, 0.44, 0.37), vec3(1.24, 0.89, 0.71), vec3(0.96, 0.64, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
