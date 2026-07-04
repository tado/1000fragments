uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.87 + t * 1.50) - 0.5) * 2.0;
    v = sin((p.y * 3.15 + zx * 0.87 + t * 1.95) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.04 / 3.1415927, 1.36 / r + time * 2.08);
	tv.x += tv.y * 0.31;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.55 + time * 0.98);
	col *= clamp(r * 2.09, 0.0, 1.0);
	col = mod(col * 2.15, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
