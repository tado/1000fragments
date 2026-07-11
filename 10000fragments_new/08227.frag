uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.40 + t * 0.99 + ph) + sin(p.y * 15.19 - t * 4.47 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.34), cos(time * 0.81)) * 0.13;
	float an = atan(p.y, p.x) + time * -0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.57 / 3.1415927, 0.47 / r - time * 2.71);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.02 + time * 0.55);
	col *= clamp(r * 1.62, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.44 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
