uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.50;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 21.56 - t * 4.24 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	p += vec2(-0.79, 0.46) * sin(length(p) * 5.56 - time * 2.10) * 0.25;
	p.x += sin(p.y * 6.46 + time * 2.52) * 0.19;
	p = (floor(p * 17.5) + 0.5) / 17.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.61));
	col = 0.5 + 0.5 * col;
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 0.91 + time * 11.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
