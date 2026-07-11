uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.11 + sin(p.y * 2.44 + t * 1.08) * 4.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.80 / 3.1415927, 0.78 / r - time * 0.65);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.26, vec3(0.41, 0.48, 0.50), vec3(0.43, 0.31, 0.42), vec3(1.18, 0.84, 0.73), vec3(0.32, 0.33, 0.04));
	col *= clamp(r * 2.59, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
