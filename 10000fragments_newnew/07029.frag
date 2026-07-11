uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.11 + t * 0.57) - 0.5) * 2.0;
    v = sin((p.y * 6.14 + zx * 0.56 + t * 2.31) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.41), cos(time * 1.42)) * 0.29;
	float an = atan(p.y, p.x) + time * -0.26;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.64 / 3.1415927, 1.36 / r - time * 2.15);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.26 + time * 0.85);
	col *= clamp(r * 2.56, 0.0, 1.0);
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 1.39 + time * 4.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
