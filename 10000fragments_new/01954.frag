uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.99 + t * 1.98 + ph) + sin(p.y * 13.57 - t * 1.98 + ph)
        + sin((p.x + p.y) * 9.51 + t * 1.98 + ph) + sin(length(p) * 11.78 - t * 1.98 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.49), cos(time * 1.11)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.48 / 3.1415927, 1.11 / r + time * 2.93);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.16, 0.65, 0.49) * (0.20 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.50, 0.0, 1.0);
	col *= 0.86 + 0.18 * sin(gl_FragCoord.y * 1.15 + time * 10.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
