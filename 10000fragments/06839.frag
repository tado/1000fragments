uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.67 - t * 2.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.78), cos(time * 0.47)) * 0.15;
	float an = atan(p.y, p.x) + time * -0.19;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.81 / 3.1415927, 1.41 / r + time * 1.69);
	tv.x += tv.y * 0.20;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.48, 1.01, 1.14) + vec3(0.03, 0.25, 0.21);
	col *= clamp(r * 2.32, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
