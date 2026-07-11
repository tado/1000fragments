uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.77 - t * 1.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.17), cos(time * 1.47)) * 0.15;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.78 / 3.1415927, 1.24 / r - time * 1.55);
	tv.x += tv.y * 0.32;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.74, 0.27, 0.86) * (0.10 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.05, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
