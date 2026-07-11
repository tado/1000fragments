uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.86;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.20 - t * 4.31 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.10), cos(time * 1.44)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.09 / 3.1415927, 0.72 / r + time * 1.71);
	tv.x += tv.y * 0.25;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.39, vec3(0.50, 0.57, 0.49), vec3(0.39, 0.45, 0.35), vec3(1.28, 0.83, 1.33), vec3(0.40, 0.96, 0.16));
	col *= clamp(r * 2.58, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
