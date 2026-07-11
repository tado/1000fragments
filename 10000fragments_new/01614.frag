uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.16 + t * 1.39 + ph) * 0.7;
    float wb = sin(p.y * 6.29 - t * 1.79 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.42;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.63 / 3.1415927, 0.89 / r - time * 2.91);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.14, vec3(0.43, 0.49, 0.47), vec3(0.36, 0.39, 0.42), vec3(0.73, 0.85, 0.92), vec3(0.56, 0.75, 0.22));
	col *= clamp(r * 2.04, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
