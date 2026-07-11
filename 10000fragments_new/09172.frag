uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.14 * cos(sa * 3.0 + t * 2.44 + ph);
    v = sin((sr - petal) * 18.90);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 1.26)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.13 / 3.1415927, 0.87 / r + time * 0.64);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.67, 1.17, 0.82) + vec3(0.09, 0.19, 0.01);
	col *= clamp(r * 2.04, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
