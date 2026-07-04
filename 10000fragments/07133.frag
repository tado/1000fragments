uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.66 - t * 0.72;
    v = sin(floor(lv * 4.8) / 4.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.56;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.01 / 3.1415927, 0.35 / r + time * 1.17);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.81 + time * 0.08);
	col *= clamp(r * 2.82, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
