uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.15 + vec2(t * 2.46, -t * 0.54) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.70), cos(time * 0.92)) * 0.21;
	float an = atan(p.y, p.x) + time * 0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.25 / 3.1415927, 0.71 / r + time * 2.64);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.44 + time * 0.36, vec3(0.43, 0.58, 0.44), vec3(0.37, 0.46, 0.31), vec3(0.77, 0.93, 1.09), vec3(0.81, 0.52, 0.67));
	col *= clamp(r * 1.63, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
