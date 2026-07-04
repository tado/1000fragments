uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.33 - t * 7.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.55 / 3.1415927, 0.52 / r + time * 1.15);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.22, 0.27, 0.47) * (0.20 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.93, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
