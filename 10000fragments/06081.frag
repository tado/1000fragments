uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.46;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.94 - t * 5.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.21), cos(time * 1.42)) * 0.28;
	float an = atan(p.y, p.x) + time * 0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.85 / 3.1415927, 0.53 / r - time * 2.56);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.90, 0.43, 0.71) * (0.12 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.00, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
