uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.72;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.44 - t * 4.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.22, 0.37) * sin(length(p) * 4.86 - time * 1.19) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.17, vec3(0.40, 0.55, 0.49), vec3(0.38, 0.38, 0.40), vec3(1.26, 1.11, 1.07), vec3(0.27, 0.93, 0.11));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
