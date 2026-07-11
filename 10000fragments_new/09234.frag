uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.18 + sr * 8.28 - t * 0.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.72), cos(time * 1.30)) * 0.23;
	float an = atan(p.y, p.x) + time * 0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.57 / 3.1415927, 0.80 / r - time * 2.87);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.50, 1.00, 0.85) * (0.23 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.21, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.51 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
