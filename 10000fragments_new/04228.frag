uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.89;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.44 - t * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.24 / 3.1415927, 0.32 / r - time * 1.64);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.38, vec3(0.55, 0.44, 0.42), vec3(0.43, 0.45, 0.44), vec3(0.91, 1.37, 0.86), vec3(0.82, 0.52, 0.27));
	col *= clamp(r * 2.14, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
