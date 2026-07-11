uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.59 + t * 2.68 + ph) + sin(p.y * 7.66 - t * 2.68 + ph)
        + sin((p.x + p.y) * 2.96 + t * 2.68 + ph) + sin(length(p) * 13.27 - t * 2.68 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 0.86)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.29 / 3.1415927, 1.07 / r + time * 0.56);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.91, 0.72, 0.89) * (0.22 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.51, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
