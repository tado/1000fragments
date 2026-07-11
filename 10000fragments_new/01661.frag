uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.06 + vec2(t * 1.85, -t * 2.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.38;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.81 / 3.1415927, 1.38 / r - time * 1.73);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.27, vec3(0.59, 0.58, 0.47), vec3(0.39, 0.46, 0.37), vec3(1.13, 1.32, 1.01), vec3(0.14, 0.29, 0.67));
	col *= clamp(r * 2.58, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
