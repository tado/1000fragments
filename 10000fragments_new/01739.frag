uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.63;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 18.67 - t * 5.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.42;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.14 / 3.1415927, 1.22 / r + time * 1.96);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.02, 0.19), vec3(0.80, 0.95, 0.93), cc);
	col *= clamp(r * 1.21, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
