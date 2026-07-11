uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.09 + t * 0.63 + ph) + sin(p.y * 11.87 - t * 5.32 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.07), cos(time * 0.87)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.76 / 3.1415927, 0.97 / r - time * 2.19);
	tv.x += tv.y * 0.39;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.55, 0.68, 0.36) * (0.07 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.90, 0.0, 1.0);
	col = fract(col * 1.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
