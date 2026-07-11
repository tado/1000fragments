uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.01 + t * 4.92 + ph) + sin(p.y * 10.90 - t * 4.92 + ph)
        + sin((p.x + p.y) * 11.15 + t * 4.92 + ph) + sin(length(p) * 6.14 - t * 4.92 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.28;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.72 / 3.1415927, 0.54 / r - time * 1.87);
	tv.x += tv.y * 0.47;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.21, 0.23, 0.53) * (0.15 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.63, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
