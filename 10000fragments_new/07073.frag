uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.80 - t * 6.42 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.25), cos(time * 0.69)) * 0.16;
	float an = atan(p.y, p.x) + time * 0.25;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.51 / 3.1415927, 0.49 / r - time * 1.32);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.76, 0.21, 0.36) * (0.14 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.08, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
