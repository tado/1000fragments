uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.27 + t * 4.02 + ph) + sin(p.y * 2.54 - t * 4.02 + ph)
        + sin((p.x + p.y) * 7.45 + t * 4.02 + ph) + sin(length(p) * 12.63 - t * 4.02 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.19 / 3.1415927, 0.59 / r - time * 2.01);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.48 + time * 0.16);
	col *= clamp(r * 1.08, 0.0, 1.0);
	col = fract(col * 1.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
