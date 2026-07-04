uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.08 + vec2(t * 0.85, -t * 0.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.24 / 3.1415927, 0.55 / r - time * 1.83);
	tv.x += tv.y * 0.26;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.21, vec3(0.43, 0.50, 0.41), vec3(0.48, 0.35, 0.47), vec3(0.75, 0.77, 0.95), vec3(0.50, 0.82, 0.98));
	col *= clamp(r * 2.17, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
