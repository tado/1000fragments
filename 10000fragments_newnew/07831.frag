uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.23 + sin(p.y * 4.01 + t * 4.05) * 4.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.30), cos(time * 0.96)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.44 / 3.1415927, 1.35 / r - time * 2.25);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.95 + time * 0.60);
	col *= clamp(r * 1.39, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
