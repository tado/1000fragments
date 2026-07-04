uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.46;
    v = 0.5 * (sin(1.0 * cp.x + t * 2.06) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.68) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.96 / 3.1415927, 1.18 / r - time * 1.40);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.59 + time * 0.66);
	col *= clamp(r * 1.43, 0.0, 1.0);
	col *= 0.80 + 0.11 * sin(gl_FragCoord.y * 0.88 + time * 15.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
