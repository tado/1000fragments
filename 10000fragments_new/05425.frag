uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.86 + t * 3.07 + ph) + sin(p.y * 9.10 - t * 1.56 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.13), cos(time * 1.17)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.28 / 3.1415927, 0.82 / r + time * 1.04);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.46 + time * 0.15);
	col *= clamp(r * 1.34, 0.0, 1.0);
	col *= 0.89 + 0.17 * sin(gl_FragCoord.y * 1.64 + time * 12.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
