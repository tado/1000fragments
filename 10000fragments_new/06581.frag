uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.78 + vec2(t * 1.00, -t * 2.58) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.35 / 3.1415927, 1.14 / r + time * 2.35);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.20, vec3(0.56, 0.57, 0.56), vec3(0.33, 0.42, 0.44), vec3(1.01, 0.88, 0.84), vec3(0.85, 0.04, 0.58));
	col *= clamp(r * 2.26, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
