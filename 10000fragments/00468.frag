uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.18 * cos(sa * 8.0 + t * 2.51 + ph);
    v = sin((sr - petal) * 7.69);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.37 / 3.1415927, 0.89 / r - time * 2.81);
	tv.x += tv.y * 0.36;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.68 + time * 0.25);
	col *= clamp(r * 1.38, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.61 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
