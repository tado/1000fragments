uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.40 + t * 4.64 + ph) + sin(p.y * 16.83 - t * 3.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.16), cos(time * 0.79)) * 0.20;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.97 / 3.1415927, 1.08 / r - time * 0.90);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.66, 0.27, 0.85) * (0.19 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.50, 0.0, 1.0);
	col *= 0.89 + 0.14 * sin(gl_FragCoord.y * 1.38 + time * 17.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
