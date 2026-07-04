uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.33 - t * 1.61;
    v = sin(floor(lv * 4.7) / 4.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.65 / 3.1415927, 1.06 / r + time * 1.88);
	tv.x += tv.y * 0.38;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.50 + time * 0.09, vec3(0.58, 0.53, 0.48), vec3(0.35, 0.30, 0.41), vec3(0.74, 1.09, 1.32), vec3(0.60, 0.72, 0.19));
	col *= clamp(r * 1.20, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
