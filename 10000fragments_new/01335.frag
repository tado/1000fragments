uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.43 + t * 5.02 + ph) + sin(p.y * 3.69 - t * 4.21 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 1.48)) * 0.08;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.77 / 3.1415927, 0.81 / r + time * 0.86);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.95 + time * 0.75);
	col *= clamp(r * 2.96, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
