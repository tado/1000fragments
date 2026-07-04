uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.96 - t * 0.40;
    v = sin(floor(lv * 5.6) / 5.6 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.99 / 3.1415927, 0.33 / r + time * 0.68);
	tv.x += tv.y * 0.44;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.12, vec3(0.54, 0.49, 0.48), vec3(0.40, 0.42, 0.42), vec3(1.18, 1.15, 1.34), vec3(1.00, 0.49, 0.43));
	col *= clamp(r * 1.66, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
