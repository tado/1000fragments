uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.68;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 17.93 - t * 2.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 7.73 + time * 2.58) * 0.15;
	p += vec2(0.74, -0.65) * sin(length(p) * 4.30 - time * 0.85) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.27, vec3(0.53, 0.42, 0.46), vec3(0.48, 0.40, 0.43), vec3(1.24, 0.71, 0.73), vec3(0.77, 0.30, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
