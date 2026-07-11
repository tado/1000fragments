uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.14 * cos(sa * 3.0 + t * 2.09 + ph);
    v = sin((sr - petal) * 17.82);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.97), cos(time * 0.70)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.43;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.58 / 3.1415927, 0.69 / r - time * 2.59);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.13 + time * 0.20);
	col *= clamp(r * 2.19, 0.0, 1.0);
	col = mod(col * 2.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
