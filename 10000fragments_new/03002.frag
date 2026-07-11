uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.67 + sin(p.y * 3.51 + t * 4.93) * 1.11 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 1.09)) * 0.13;
	float an = atan(p.y, p.x) + time * -0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.74 / 3.1415927, 1.42 / r + time * 1.20);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.06 + time * 0.17);
	col *= clamp(r * 2.51, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.64 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
