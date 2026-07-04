uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.21 + t * 2.24 + ph) + sin(p.y * 4.17 - t * 2.24 + ph)
        + sin((p.x + p.y) * 4.76 + t * 2.24 + ph) + sin(length(p) * 6.74 - t * 2.24 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.17 / 3.1415927, 1.44 / r + time * 1.49);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.80, 0.82, 0.19) * (0.07 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.40, 0.0, 1.0);
	col = mod(col * 1.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
