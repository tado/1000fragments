uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.30 + 0.29 * pow(abs(cos(ra * 4.0 + t * 0.61)), 1.89);
    v = sin((rr - pet) * 19.75 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.51;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 13.69 - t * 4.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.43 + time * 0.09, vec3(0.45, 0.58, 0.45), vec3(0.31, 0.41, 0.45), vec3(1.29, 1.38, 0.81), vec3(0.33, 0.20, 0.80));
	col = fract(col * 1.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
