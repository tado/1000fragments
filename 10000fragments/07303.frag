uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.07 + sin(p.y * 2.00 + t * 5.39) * 1.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.92 / 3.1415927, 1.10 / r + time * 2.22);
	tv.x += tv.y * 0.17;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.23, vec3(0.47, 0.42, 0.45), vec3(0.30, 0.45, 0.36), vec3(1.36, 0.92, 0.88), vec3(0.85, 0.86, 0.75));
	col *= clamp(r * 1.56, 0.0, 1.0);
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 2.40 + time * 10.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
