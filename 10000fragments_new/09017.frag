uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.64 + t * 4.95 + ph) + sin(p.y * 13.40 - t * 4.95 + ph)
        + sin((p.x + p.y) * 4.52 + t * 4.95 + ph) + sin(length(p) * 4.43 - t * 4.95 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.75), cos(time * 0.59)) * 0.18;
	float an = atan(p.y, p.x) + time * -0.40;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.03 / 3.1415927, 0.79 / r - time * 1.59);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.50, 0.88, 0.37) * (0.20 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.68, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
