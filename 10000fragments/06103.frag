uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.05 + t * 1.00) - 0.5) * 2.0;
    v = sin((p.y * 4.90 + zx * 1.72 + t * 1.93) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.28 / 3.1415927, 1.19 / r - time * 1.69);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.15, vec3(0.50, 0.43, 0.41), vec3(0.32, 0.31, 0.40), vec3(0.96, 1.19, 0.91), vec3(0.26, 0.90, 0.05));
	col *= clamp(r * 2.40, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
