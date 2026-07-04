uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.02 + t * 1.14 + ph) + sin(p.y * 6.74 - t * 1.14 + ph)
        + sin((p.x + p.y) * 5.61 + t * 1.14 + ph) + sin(length(p) * 8.72 - t * 1.14 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.40 / 3.1415927, 1.31 / r - time * 1.31);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.27, 0.81, 0.57) * (0.07 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.82, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
