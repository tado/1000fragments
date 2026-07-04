uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.48 - t * 0.38;
    v = sin(floor(lv * 2.7) / 2.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.23;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.49 / 3.1415927, 0.89 / r - time * 2.07);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.60 + time * 0.05);
	col *= clamp(r * 2.43, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
