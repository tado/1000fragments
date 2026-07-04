uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.32 - t * 7.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.40;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.27 / 3.1415927, 1.09 / r - time * 2.47);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.19, 0.66, 0.77) * (0.06 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.10, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
