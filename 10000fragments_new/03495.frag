uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.82 + sin(p.y * 5.61 + t * 1.39) * 3.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.71;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.22 / 3.1415927, 0.47 / r + time * 2.38);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.02, vec3(0.54, 0.52, 0.51), vec3(0.33, 0.48, 0.40), vec3(0.80, 1.02, 0.81), vec3(0.74, 0.13, 0.90));
	col *= clamp(r * 2.16, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
