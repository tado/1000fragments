uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.25 * cos(sa * 6.0 + t * 2.58 + ph);
    v = sin((sr - petal) * 19.36);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.01), cos(time * 1.13)) * 0.06;
	float an = atan(p.y, p.x) + time * 0.55;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.24 / 3.1415927, 0.37 / r + time * 1.00);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.37, vec3(0.46, 0.47, 0.43), vec3(0.40, 0.48, 0.37), vec3(0.70, 0.81, 0.98), vec3(0.37, 0.50, 0.12));
	col *= clamp(r * 1.81, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
