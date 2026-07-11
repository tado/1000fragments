uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.11 - t * 3.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.23;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.54 / 3.1415927, 0.82 / r - time * 1.67);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.38 + time * 0.37);
	col *= clamp(r * 1.33, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
