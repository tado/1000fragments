uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.95 - t * 1.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.67), cos(time * 0.50)) * 0.29;
	float an = atan(p.y, p.x) + time * 0.15;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.55 / 3.1415927, 1.04 / r + time * 2.90);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.61, 0.53, 0.86) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.37, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
