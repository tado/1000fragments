uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.32;
    v = 0.5 * (sin(5.0 * cp.x + t * 2.41) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.76) * sin(5.0 * cp.y + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.10;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.87 - t * 2.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.90;
	p *= 2.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.64 + time * 0.17, vec3(0.60, 0.56, 0.42), vec3(0.45, 0.38, 0.38), vec3(0.79, 1.18, 1.06), vec3(0.41, 0.20, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
