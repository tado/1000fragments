uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.92 + t * 4.52 + ph) + sin(p.y * 17.28 - t * 0.84 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.84), cos(time * 1.38)) * 0.25;
	float an = atan(p.y, p.x) + time * -0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.17 / 3.1415927, 1.13 / r - time * 2.63);
	tv.x += tv.y * 0.43;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.22, 0.43, 0.88) * (0.24 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.95, 0.0, 1.0);
	col = fract(col * 2.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
