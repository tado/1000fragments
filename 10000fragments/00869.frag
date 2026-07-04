uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.02 + sin(p.y * 3.67 + t * 3.50) * 1.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.32 / 3.1415927, 1.33 / r - time * 0.96);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.24, 1.18, 0.52) + vec3(0.21, 0.04, 0.19);
	col *= clamp(r * 1.36, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
