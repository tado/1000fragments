uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.90 - t * 5.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.92 / 3.1415927, 1.28 / r + time * 2.62);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.19, vec3(0.54, 0.48, 0.49), vec3(0.49, 0.48, 0.38), vec3(0.75, 1.06, 1.19), vec3(0.27, 0.09, 0.52));
	col *= clamp(r * 1.82, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
