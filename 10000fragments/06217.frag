uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.42;
    v = 0.5 * (sin(1.0 * cp.x + t * 0.64) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 2.45) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.94), cos(time * 1.19)) * 0.12;
	float an = atan(p.y, p.x) + time * 0.33;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.05 / 3.1415927, 1.27 / r - time * 2.52);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.10, vec3(0.58, 0.57, 0.42), vec3(0.37, 0.43, 0.48), vec3(0.77, 0.85, 1.11), vec3(0.65, 0.51, 0.95));
	col *= clamp(r * 1.96, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
