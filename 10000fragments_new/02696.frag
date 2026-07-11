uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.22 + sin(p.y * 5.57 + t * 0.53) * 2.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.80), cos(time * 0.81)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.14 / 3.1415927, 1.34 / r - time * 0.88);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.34, vec3(0.42, 0.48, 0.49), vec3(0.35, 0.46, 0.44), vec3(1.01, 0.73, 0.80), vec3(0.99, 0.41, 0.50));
	col *= clamp(r * 1.86, 0.0, 1.0);
	col = mod(col * 1.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
