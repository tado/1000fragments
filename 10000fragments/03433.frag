uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.75;
    v = 0.5 * (sin(6.0 * cp.x + t * 0.68) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 2.61) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.07 / 3.1415927, 1.10 / r - time * 2.20);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.68, 1.22, 1.36) + vec3(0.17, 0.04, 0.15);
	col *= clamp(r * 2.36, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
