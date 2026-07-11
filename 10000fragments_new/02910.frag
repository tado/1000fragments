uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.19 * cos(sa * 6.0 + t * 1.35 + ph);
    v = sin((sr - petal) * 16.30);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.07), cos(time * 0.97)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.72 / 3.1415927, 0.80 / r + time * 2.76);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.17);
	col *= clamp(r * 2.80, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
