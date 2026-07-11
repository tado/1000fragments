uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.53 + t * 2.06 + ph) + sin(p.y * 4.15 - t * 2.06 + ph)
        + sin((p.x + p.y) * 10.97 + t * 2.06 + ph) + sin(length(p) * 5.72 - t * 2.06 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.32), cos(time * 0.98)) * 0.08;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.87 / 3.1415927, 0.41 / r + time * 2.50);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.74 + time * 0.31);
	col *= clamp(r * 1.85, 0.0, 1.0);
	col = mod(col * 2.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
