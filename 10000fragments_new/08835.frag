uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.18 + sin(p.y * 2.85 + t * 1.08) * 2.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.98), cos(time * 1.38)) * 0.16;
	float an = atan(p.y, p.x) + time * -0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.98 / 3.1415927, 1.10 / r - time * 1.32);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.17 + time * 0.79);
	col *= clamp(r * 2.75, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
