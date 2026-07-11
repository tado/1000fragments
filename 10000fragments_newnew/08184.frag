uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.24 * cos(sa * 5.0 + t * 0.69 + ph);
    v = sin((sr - petal) * 7.65);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.34), cos(time * 1.49)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.10 / 3.1415927, 1.00 / r - time * 2.90);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.02, vec3(0.53, 0.56, 0.48), vec3(0.31, 0.49, 0.37), vec3(1.06, 0.79, 0.86), vec3(0.24, 0.83, 0.39));
	col *= clamp(r * 2.78, 0.0, 1.0);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 2.41 + time * 6.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
