uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.99;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.30 - t * 5.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.0 + 0.22 * sin(time * 2.63);
	p = fract(p * 1.80) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.26, vec3(0.49, 0.57, 0.50), vec3(0.38, 0.31, 0.35), vec3(0.73, 1.38, 0.73), vec3(0.44, 0.94, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
