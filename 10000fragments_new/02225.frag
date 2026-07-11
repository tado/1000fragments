uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.16 * cos(sa * 4.0 + t * 1.59 + ph);
    v = sin((sr - petal) * 9.26);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.74), cos(time * 0.55)) * 0.18;
	float an = atan(p.y, p.x) + time * 0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.51 / 3.1415927, 1.44 / r - time * 2.13);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.05 + time * 0.06);
	col *= clamp(r * 2.76, 0.0, 1.0);
	col = fract(col * 1.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
