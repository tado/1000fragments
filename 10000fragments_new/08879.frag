uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.13;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 19.56 - t * 3.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.62 / 3.1415927, 0.86 / r + time * 1.62);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.98, 0.46, 0.31) * (0.05 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.79, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.92 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
