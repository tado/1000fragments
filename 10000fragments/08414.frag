uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
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
    v = sin(hd * 19.32 - t * 2.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	p = (floor(p * 7.3) + 0.5) / 7.3;
	{ float fr = length(p); p *= 1.0 + 0.34 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.94 + time * 0.10);
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 1.94 + time * 8.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
