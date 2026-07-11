uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.75;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 19.12 - t * 4.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.24 / 3.1415927, 1.15 / r - time * 2.26);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.23 + time * 0.17);
	col *= clamp(r * 2.31, 0.0, 1.0);
	col = mod(col * 2.19, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
