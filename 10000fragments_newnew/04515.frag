uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.49 + sr * 18.97 - t * 0.97 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.59), cos(time * 0.59)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.69;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.74 / 3.1415927, 0.46 / r - time * 0.90);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.04 + time * 0.92);
	col *= clamp(r * 1.70, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.56 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
