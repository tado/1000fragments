uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.22;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.68 - t * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.56) * 0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.46 / 3.1415927, 1.25 / r + (time * 0.56) * 1.81);
	tv.x += tv.y * 0.17;
	float d = field(tv, (time * 0.56), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.05, 0.06), vec3(0.59, 0.76, 0.71), cc);
	col *= clamp(r * 2.38, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 0.965, 0.993) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
