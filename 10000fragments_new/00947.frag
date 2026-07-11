uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.19 + vec2(t * 0.74, -t * 0.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.15;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.95 / 3.1415927, 0.55 / r + time * 1.05);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.26, vec3(0.55, 0.59, 0.52), vec3(0.40, 0.32, 0.43), vec3(1.24, 0.71, 1.32), vec3(0.43, 0.10, 0.65));
	col *= clamp(r * 2.89, 0.0, 1.0);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
