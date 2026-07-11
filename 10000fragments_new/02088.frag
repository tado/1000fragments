uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.68 - t * 8.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.07 / 3.1415927, 1.20 / r - time * 1.19);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.27, 0.32, 0.69) * (0.13 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.66, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
