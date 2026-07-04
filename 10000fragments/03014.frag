uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.79 + t * 0.38) - 0.5) * 2.0;
    v = sin((p.y * 6.13 + zx * 0.50 + t * 1.25) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.88), cos(time * 0.44)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.23 / 3.1415927, 0.86 / r + time * 2.20);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.13, vec3(0.57, 0.56, 0.41), vec3(0.48, 0.45, 0.43), vec3(1.21, 1.05, 0.81), vec3(0.85, 0.90, 0.03));
	col *= clamp(r * 2.62, 0.0, 1.0);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
