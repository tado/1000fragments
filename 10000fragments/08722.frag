uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.23 + sin(p.y * 1.58 + t * 1.38) * 2.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.98), cos(time * 1.34)) * 0.12;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.21 / 3.1415927, 1.21 / r - time * 0.96);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.03 + time * 0.00);
	col *= clamp(r * 1.74, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
