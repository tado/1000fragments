uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.20 * cos(sa * 4.0 + t * 0.76 + ph);
    v = sin((sr - petal) * 19.95);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.05 / 3.1415927, 0.80 / r - time * 1.62);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.07, 0.29), vec3(0.79, 0.81, 0.62), cc);
	col *= clamp(r * 2.74, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.03 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
