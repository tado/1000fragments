uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.30 + sin(p.y * 5.71 + t * 2.90) * 2.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.80), cos(time * 0.80)) * 0.29;
	float an = atan(p.y, p.x) + time * 0.27;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.95 / 3.1415927, 0.65 / r + time * 1.41);
	tv.x += tv.y * 0.39;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.44 + time * 0.09);
	col *= clamp(r * 1.81, 0.0, 1.0);
	col = fract(col * 1.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
