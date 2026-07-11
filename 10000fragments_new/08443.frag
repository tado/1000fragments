uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.16 * cos(sa * 8.0 + t * 2.13 + ph);
    v = sin((sr - petal) * 9.29);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.07), cos(time * 1.23)) * 0.18;
	float an = atan(p.y, p.x) + time * -0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.62 / 3.1415927, 1.24 / r + time * 1.87);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.83 + time * 0.02);
	col *= clamp(r * 2.80, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.69 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
