uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.11 + sin(p.y * 3.96 + t * 4.21) * 3.54 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.57), cos(time * 1.15)) * 0.24;
	float an = atan(p.y, p.x) + time * -0.13;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.05 / 3.1415927, 0.45 / r + time * 1.79);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.75 + time * 0.12);
	col *= clamp(r * 2.72, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.04 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
