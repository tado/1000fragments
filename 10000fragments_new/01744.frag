uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.88;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 15.18 - t * 1.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.87;
	p += vec2(0.85, 0.96) * sin(length(p) * 5.55 - time * 1.29) * 0.17;
	p = abs(p);
	p = (floor(p * 7.0) + 0.5) / 7.0;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.01, vec3(0.42, 0.51, 0.40), vec3(0.32, 0.37, 0.34), vec3(1.24, 1.14, 1.35), vec3(0.87, 0.52, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
