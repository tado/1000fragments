uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.09;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 15.34 - t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.12;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.36 / 3.1415927, 0.69 / r - time * 2.89);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.02, vec3(0.52, 0.43, 0.45), vec3(0.32, 0.37, 0.30), vec3(1.18, 1.30, 0.85), vec3(0.33, 0.44, 0.62));
	col *= clamp(r * 2.94, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
