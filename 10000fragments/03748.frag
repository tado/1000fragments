uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.78;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 17.88 - t * 3.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	p *= 1.0 + 0.34 * sin(time * 1.48);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.04, vec3(0.56, 0.41, 0.44), vec3(0.31, 0.37, 0.47), vec3(1.31, 1.10, 1.07), vec3(0.36, 0.01, 0.99));
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
