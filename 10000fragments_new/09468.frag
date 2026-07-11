uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.31 + sr * 8.44 - t * 4.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.49), cos(time * 0.57)) * 0.12;
	float an = atan(p.y, p.x) + time * 0.80;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.87 / 3.1415927, 0.96 / r - time * 1.66);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.79 + time * 0.28);
	col *= clamp(r * 1.04, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.40 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
