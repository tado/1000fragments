uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.56 - t * 2.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.49 / 3.1415927, 1.27 / r - time * 2.56);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.04, vec3(0.55, 0.53, 0.57), vec3(0.43, 0.39, 0.32), vec3(1.19, 1.13, 0.73), vec3(0.88, 0.99, 0.96));
	col *= clamp(r * 1.57, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
