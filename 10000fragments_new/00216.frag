uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.41 + sin(p.y * 5.70 + t * 5.37) * 4.80 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.57), cos(time * 0.82)) * 0.28;
	float an = atan(p.y, p.x) + time * 0.70;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.63 / 3.1415927, 1.00 / r - time * 1.10);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.28 + time * 1.00);
	col *= clamp(r * 1.25, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
