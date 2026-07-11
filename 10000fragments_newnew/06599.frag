uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.71;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.86) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 2.66) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.37), cos(time * 0.80)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.75 / 3.1415927, 1.07 / r - time * 0.59);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.53 + time * 0.65);
	col *= clamp(r * 1.06, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.35 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
