uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.67 + t * 3.94 + ph) + sin(p.y * 15.39 - t * 1.39 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.41), cos(time * 0.58)) * 0.06;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.20 / 3.1415927, 1.38 / r - time * 1.39);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.51, 0.20, 0.83) * (0.11 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.20, 0.0, 1.0);
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 2.91 + time * 7.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
