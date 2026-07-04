uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.16;
    v = 0.5 * (sin(1.0 * cp.x + t * 2.16) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 1.95) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.89), cos(time * 1.45)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.25 / 3.1415927, 0.50 / r + time * 1.30);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.11, 0.24), vec3(0.68, 0.69, 0.59), cc);
	col *= clamp(r * 1.61, 0.0, 1.0);
	col *= 0.88 + 0.13 * sin(gl_FragCoord.y * 2.86 + time * 11.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
