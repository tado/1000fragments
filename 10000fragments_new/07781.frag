uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.11 + t * 5.08 + ph) + sin(p.y * 17.75 - t * 4.76 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.76;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.15 - t * 4.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	p *= 3.08;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.59);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.60 + time * 0.15, vec3(0.53, 0.57, 0.54), vec3(0.33, 0.41, 0.36), vec3(1.01, 0.73, 0.73), vec3(0.82, 0.93, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
