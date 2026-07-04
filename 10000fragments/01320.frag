uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.95;
    v = 0.5 * (sin(2.0 * cp.x + t * 0.91) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.12) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.17 / 3.1415927, 0.49 / r - time * 2.22);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.02, 1.46, 1.29) + vec3(0.05, 0.16, 0.12);
	col *= clamp(r * 1.11, 0.0, 1.0);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.46 + time * 12.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
